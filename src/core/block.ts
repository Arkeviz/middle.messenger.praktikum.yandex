import type { IBaseBlockProps } from '../types'
import Handlebars from 'handlebars'
import { v4 as makeUUID } from 'uuid'
import EventBus from './eventBus.ts'

export enum LIFECYCLE_EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type TChildren = Record<string, Block | Block[]>

type TEventBus = EventBus<LIFECYCLE_EVENTS>

export default abstract class Block<
  TProps extends IBaseBlockProps = Record<string, unknown>,
> {
  private readonly _id: string
  get id() {
    return this._id
  }

  private readonly _meta: {
    tagName: string
    props: TProps
  }

  private _element: HTMLElement
  get element() {
    return this._element
  }

  props: TProps
  children: TChildren
  getChildren = () => this.children

  private readonly eventBus: () => EventBus<LIFECYCLE_EVENTS>

  protected constructor(
    tagName: string = 'div',
    propsWithChildren: TProps = {} as TProps,
  ) {
    this._id = makeUUID()
    this._element = '' as unknown as HTMLElement

    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    this._meta = { tagName, props }
    this.children = children

    const eventBus = new EventBus<LIFECYCLE_EVENTS>()
    this.eventBus = () => eventBus

    this.props = this._makePropsProxy({ ...props, id: this._id })

    this._registerLifecycleEvents(eventBus)
    this.eventBus().emit(LIFECYCLE_EVENTS.INIT)
  }

  private _registerLifecycleEvents(eventBus: TEventBus) {
    eventBus.on(LIFECYCLE_EVENTS.INIT, this.init.bind(this))
    // TODO не придумал как дотипизировать без `any` у `TCallback`
    eventBus.on(LIFECYCLE_EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(LIFECYCLE_EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(LIFECYCLE_EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  init() {
    this._createResources()
    this.eventBus().emit(LIFECYCLE_EVENTS.FLOW_RENDER)
  }

  private _createResources() {
    if (!this._meta) return

    const { tagName, props } = this._meta
    this._element = this._createDocumentElement(tagName)

    if (typeof props.className === 'string') {
      this._element.classList.add(...props.className.split(' '))
    }

    if (typeof props.attrs === 'object') {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element?.setAttribute(attrName, attrValue as string)
      })
    }
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName)
    element.setAttribute('data-id', this._id)
    return element
  }

  private _makePropsProxy(props: TProps) {
    const eventBus = this.eventBus()
    const emitBind = eventBus.emit.bind(eventBus)

    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop as string]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop, value) => {
        const oldProps = { ...target }

        ;(target as Record<string, unknown>)[prop as string] = value
        emitBind(LIFECYCLE_EVENTS.FLOW_CDU, oldProps, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  getContent() {
    return this.element
  }

  private _getChildrenAndProps(propsAndChildren: TProps): {
    props: TProps
    children: TChildren
  } {
    const children: TChildren = {}
    const props: TProps = {} as TProps

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((i) => i instanceof Block)) {
        children[key] = value
      } else if (value instanceof Block) {
        children[key] = value
      } else {
        ;(props as Record<string, unknown>)[key] = value
      }
    })

    return { children, props }
  }

  private _addEvents() {
    const events = this.props?.events ?? {}

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName])
    })
  }
  private _removeEvents() {
    const events = this.props?.events ?? {}

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName])
    })
  }

  setProps = (nextProps: Partial<TProps>) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  private _render() {
    this._removeEvents()
    const block = this._compile()

    if (this._element?.children.length === 0) {
      this._element.appendChild(block)
    } else {
      this._element?.replaceChildren(block)
    }

    this._addEvents()
  }

  // Может переопределять пользователь, необязательно трогать
  render(): string {
    return ''
  }

  private _compile() {
    const propsAndStubs = { ...this.props } as Record<string, unknown>

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (component) => `<div data-id="${component.id}"></div>`,
        )
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement
    const getTemplate = Handlebars.compile(this.render())
    fragment.innerHTML = getTemplate(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component.id}"]`,
          )
          stub?.replaceWith?.(component.getContent())
        })
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
        stub?.replaceWith(child.getContent()!)
      }
    })

    return fragment.content
  }

  private _componentDidMount(oldProps: TProps) {
    this.componentDidMount(oldProps)

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  componentDidMount(oldProps: TProps) {
    return true
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(LIFECYCLE_EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return true
  }

  /** Возвращает элемент
   * @param {string} [display='block'] стиль `display`
   */
  show(display: string = 'block') {
    this.getContent().style.display = display
  }

  /** Скрывает элемент (`display: none;`) */
  hide() {
    this.getContent().style.display = 'none'
  }
}
