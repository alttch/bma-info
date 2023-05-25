.. js:function:: $eva.toolbox.animate(ctx)

    Animate html element block
    
    Simple loading animation

    :param ctx: DOM element (or id)
    :type ctx: string or object

.. js:function:: $eva.toolbox.chart(ctx, cfg, oid, params)

    Display a chart
    
    If multiple timeframes and multiple items are specified, chart data is
    filled as: first timeframe for all items, second timeframe for all
    items etc.

    :param ctx: html container element or id to draw in (must
                           have fixed width/height)
    :type ctx: string or object
    :param cfg: Chart.js configuration (Chart.js v4)
    :type cfg: object
    :param oid: item oid or oids
    :type oid: string or array
    :param params: object with props

              timeframe - timeframe to display (5T - 5 min, 2H - 2 hr, 2D
              - 2 days etc.), default: 1D. To display past timeframes, use
              two values, separated with ":", e.g. 2D:1D - get data for
              yesterday. To display multiple timeframes, send this param as
              array. Axis X is always formed from the first timeframe. If
              you want to change this, put "t" before the necessary
              timeframe, e.g.: t2D:1D

              fill - precision[:np] (10T - 60T recommended, more accurate -
              more data), np - number precision, optional. default: 30T:2

              update - update interval in seconds. If the chart container
              is no longer visible, chart stops updating

              prop - item property to use (default is value)

              units - data units (e.g. mm or °C)

              args - additional API options (state_history)
    :type params: object
    :return: chart object

.. js:function:: $eva.toolbox.popup(ctx, pclass, title, msg, params)

    Popup window
    
    Opens  popup window.
    
    There can be only one popup opened using the specified html ctx. If the
    page wants to open another popup, the current one is overwritten unless
    its pclass is higher than a new one.

    :param ctx: html element to use as popup (any empty <div />
                           is fine)
    :type ctx: string or object
    :param pclass: popup class: info, warning or error. opens a large
                       popup window if '!' is put before the class (e.g.
                       !info)
    :type pclass: string
    :param title: popup window title
    :type title: string
    :param msg: popup window message
    :type msg: string
    :param params: object with handlers and additional parameters:

                       ct - popup auto close time (sec), equal to pressing
                       escape

                       btn1 - button 1 name (default: 'OK')
                       btn2 - button 2 name

                       va - validate function which is executed before
                       Promise resolves. If the function returns true, the
                       popup is closed and resolve function is executed.
                       The function is commonly used to validate input if
                       popup contains input fields.
    :type params: object
    :return: Promise object. Resolve and reject functions are called with
                        "true" parameter if button is pressed by user.

