import { GestureKey } from './config'
import { Vector2, WebKitGestureEvent } from './utils'

export type IngKey = 'dragging' | 'wheeling' | 'moving' | 'hovering' | 'scrolling' | 'pinching'

export type SharedGestureState = {
  /**
   * True if the element is being dragged.
   */
  dragging?: boolean
  /**
   * True if the element is being wheeled.
   */
  wheeling?: boolean
  /**
   * True if the element is being moved.
   */
  moving?: boolean
  /**
   * True if the element is being hovered.
   */
  hovering?: boolean
  /**
   * True if the element is being scrolled.
   */
  scrolling?: boolean
  /**
   * True if the element is being pinched.
   */
  pinching?: boolean
  /**
   * Number of fingers touching the screen.
   */
  touches: number
  /**
   * True when a mouse button or touch is pressed.
   */
  pressed: boolean
  /**
   * Alias for pressed.
   */
  down: boolean
  /**
   * True if the document is in lock mode.
   */
  locked: boolean
  /**
   * Indicates which buttons are pressed (https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons).
   */
  buttons: number
  /**
   * True when the Shift key is pressed.
   */
  shiftKey: boolean
  /**
   * True when the Alt key is pressed.
   */
  altKey: boolean
  /**
   * True when the Meta key is pressed.
   */
  metaKey: boolean
  /**
   * True when the Control key is pressed.
   */
  ctrlKey: boolean
}

export type CommonGestureState = {
  _active: boolean
  _blocked: boolean
  _force: boolean
  _step: [false | number, false | number]
  _movement: Vector2
  _bounds: [Vector2, Vector2]
  _threshold: Vector2
  /**
   * The event triggering the gesture.
   */
  event: UIEvent
  /**
   * The event current target.
   */
  target: EventTarget
  /**
   * True when the gesture is intentional (passed the threshold).
   */
  intentional: boolean
  /**
   * Cumulative distance of the gesture. Deltas are summed with their absolute
   * values.
   */
  distance: Vector2
  /**
   * Displacement of the current gesture.
   */
  movement: Vector2
  /**
   * Difference between the current movement and the previous movement.
   */
  delta: Vector2
  /**
   * Cumulative displacements of all gestures (sum of all movements triggered
   * by the handler)
   */
  offset: Vector2
  /**
   * Offset when the gesture started.
   */
  lastOffset: Vector2
  /**
   * Velocity vector.
   */
  velocity: Vector2
  /**
   * Current raw values of the gesture. Can be coordinates or distance / angle
   * depending on the gesture.
   */
  values: Vector2
  /**
   * Raw values when the gesture started.
   */
  initial: Vector2
  /**
   * Direction per axis. -1 when going down, 1 when going up, 0 when still.
   */
  direction: Vector2
  /**
   * True when it's the first event of the active gesture.
   */
  first: boolean
  /**
   * True when it's the last event of the active gesture.
   */
  last: boolean
  /**
   * True when the gesture is active.
   */
  active: boolean
  /**
   * The timestamp (ms) of when the gesture started.
   */
  startTime: number
  /**
   * The timestamp (ms) of the current event.
   */
  timeStamp: number
  /**
   * Elapsed time (ms) of the current gesture.
   */
  elapsedTime: number
  /**
   * Value returned by your handler on its previous run.
   */
  memo?: any
  /**
   * The arguments passed to the bind function (only relevant in React when
   * using `<div {...bind(someArgument)} />`)
   */
  args?: any
}

export type CoordinatesState = CommonGestureState & {
  axis: 'x' | 'y' | undefined
  xy: Vector2
}

export type DragState = CoordinatesState & {
  _pointerId?: number
  _pointerActive: number
  _keyboardActive: number
  _preventScroll: boolean
  _delayed: boolean
  /**
   * True when the drag gesture has been canceled by the `cancel` function.
   */
  canceled: boolean
  /**
   * Function that can be called to cancel the drag.
   */
  cancel(): void
  /**
   * True if the drag gesture is recognized as a tap (ie when the displacement
   * is lower than 3px per axis).
   */
  tap: boolean
  /**
   * [swipeX, swipeY] is [0, 0] if no swipe detected, -1 or 1 otherwise.
   */
  swipe: Vector2
}

export interface PinchState extends CommonGestureState {
  _pointerEvents: Map<number, PointerEvent>
  _touchIds: [number, number]
  /**
   * Coordinates of the center of touch events, or the cursor when using wheel
   * to pinch.
   */
  origin: Vector2
  /**
   * The number of full rotation the current gesture has performed.
   */
  turns: number
  /**
   * True when the pinch gesture has been canceled by the `cancel` function.
   */
  canceled: boolean
  /**
   * Function that can be called to cancel the pinch.
   */
  cancel(): void
}

export interface State {
  shared: SharedGestureState
  drag?: DragState & { event: PointerEvent | TouchEvent | MouseEvent | KeyboardEvent }
  wheel?: CoordinatesState & { event: WheelEvent }
  scroll?: CoordinatesState & { event: UIEvent }
  move?: CoordinatesState & { event: PointerEvent }
  hover?: CoordinatesState & { event: PointerEvent }
  pinch?: PinchState & { event: PointerEvent | TouchEvent | WheelEvent | WebKitGestureEvent }
}

export type FullGestureState<T extends GestureKey> = SharedGestureState & State[T]
