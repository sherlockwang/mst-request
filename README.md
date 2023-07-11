# MST Request

This a tiny lib handling async request in Mobx State Tree. The package can be treated as a custom model type. It doesn't handler the request, but accept a request function, and provide data, status, and some other handlers for Mobx State Tree. So users don't have to handle these status along with every request themselves.

The idea of this package is simple, handler the status change during a request for you, and gether all the status of a request in one place. So it is very simple, but should be able to save more effort than its size.

## Install

`npm i mst-request -S`

## Usage

Declare

`types.model('NAME').props({ ..., asyncData: Request, ... })`

Use

`<div>{asyncData.PROPS}</div>` or `asyncData.ACTIONS()`

## APIs

The point of this lib is minium must features. So it only gives you a few key props.

### props

`status`

Indicate request status, is one of these: 'init', 'pending', 'success', 'error', 'canceled'

`data`

Hold response data, the data is returned by the request function.

Default is an empty array. The items in the data array is not observable.

`error`

Hold response error, the error is thrown by the request function.

`token`

An identifier, can be set by `option()`. By default is an empty string, only need to set if you want to identify the request.

`loading`

A computed value derived from `status`. Return `true` when status is "pending".

### actions

Some actions are necessary, some are not. For normal use case, only a few actions are needed.

`set(request, reject?)`

Set the request and reject function for a mst-request. The request function will be used for later fetch action. 

Every time called `set` action will reset the mst-request. See `reset()` action for more detail.

If `option()` is called to set `once = true`, the request function can only be set for one time. See `option()` action for more detail.

**Must be called before fetch to set a request function.**

`fetch(params)`

Call the request function set by `set()` action with the `params` passed in.

It will also update the status, data, and error props according the request function result. If a reject handler is set in `set()` action, it will be used to handle error. 

If a request call is succeed, the return value of the request function can be access via `data` prop. If an error occur, the data will be `[]`, and the error can be access via `error` prop.

**It is recommend to let the request function return data in an array for consistent.**

`reset()`

Clear `data` and `error` props, and make status to 'init'. Just like how the mst-request looks like after `set()` action is called.

`refetch()`

Cancel current `fetch()` and clear current `data`, and then recall the `fetch()` action.

**It will use last time parameters, so if you want to change parameters, call `fetch()` instead.**

`option()`

Optional, can used to set a unique token and make request can be set one time only. Only needed when you want to change the default behavior of `set()`.

`setCancel()`

Optional, can set an abort controller for this request. The controller will be passed to request function as `{ controller: new AbortController() }`

`cancel()`

If an abort controller is set, the current pending request will be canceled by calling this action. The status will be change to `canceled` too. Otherwise, it will give a warning about missing abort controller.
