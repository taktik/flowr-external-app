import { ErrorSeverity, ICustomAppServices, IFlowrCustomAppParams, FlowrEventName, IFlowrEventManager } from 'taktik_flowr_interface/dist'
import { template } from 'lodash'

class TemplateAppLayer {
	private _el: HTMLElement | undefined
	private readonly _eventManager: IFlowrEventManager
	private readonly _location: string
	private readonly _subLocation: string
	private readonly _deviceId: string
	private readonly _template: any = template(require('./index.ejs'))
	private readonly _customAppServices: ICustomAppServices
	private readonly _valueFromAdmin: string

	constructor(params: IFlowrCustomAppParams) {
		this._eventManager = params.appLayer
		this._subLocation = params.options.location
		this._location = params.options.location
		this._deviceId = params.options.device.id
		this._customAppServices = params.customAppServices
		this._valueFromAdmin = params.options.applicationConfigValues.valueFromAdmin
		this._bindKeyEvents()
	}

	async render(target: HTMLElement): Promise<TemplateAppLayer> {
		this._el = target
		if (!this._location || !this._subLocation || !this._deviceId) {
			this._customAppServices.errorHandler(ErrorSeverity.INVALID_DATA)
		} else {
			this._el.innerHTML = this._template({
				location: this._location,
				subLocation: this._subLocation,
				deviceId: this._deviceId,
				valueFromAdmin: this._valueFromAdmin
			})
		}
		return this
	}

	public onClose(): void {
		this._unBindKeyEvents()
	}

	private _arrowDownPress(): void {
		console.log('Arrow down press')
	}

	private _arrowUpPress(): void {
		console.log('Arrow Up press')
	}

	/**
	 * Listen specific events send by flowr
	 * @private
	 */
	private _bindKeyEvents(): void {
		this._eventManager.on(FlowrEventName.ARROW_DOWN_PRESS, this._arrowDownPress, this)
		this._eventManager.on(FlowrEventName.ARROW_UP_PRESS, this._arrowUpPress, this)
	}

	/**
	 * Stop listen specific events send by flowr
	 * @private
	 */
	private _unBindKeyEvents(): void {
		this._eventManager.off(FlowrEventName.ARROW_DOWN_PRESS, this._arrowDownPress, this)
		this._eventManager.off(FlowrEventName.ARROW_UP_PRESS, this._arrowUpPress, this)
	}
}

let app: TemplateAppLayer
(window as any).entry = async function(params: IFlowrCustomAppParams) {
	app = new TemplateAppLayer(params)
	await app.render(params.target)
}
window.close = function() {
	app.onClose()
	app = undefined
}
