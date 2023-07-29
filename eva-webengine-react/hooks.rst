Low-level hooks
***************

.. contents::

.. _eva_webengine_react_use_evastate:

useEvaState
===========

React hook, which contains state of EVA ICS item. The state is automatically
updated in real time.

This is the basic hook to get item states, which is used in the majority of UI
components.

Parameters
----------

.. code:: typescript

    interface EvaStateParams {
      oid: string;
      engine?: Eva;
    }

Usage example
-------------

.. code:: jsx

   import { useEvaState } from "@eva-ics/webengine-react";

   const MyComponent = () => {
     const state = useEvaState({ oid: "sensor:env/temp" });

     let value = state.value;
     return <span>{value}</span>;
   }

.. _eva_webengine_react_use_evastatehistory:

useEvaStateHistory
==================

React hook, which contains historical state of EVA ICS item. The state is
automatically updated with the specified interval.

The hook is used in :doc:`components/linechart` component. It also can be used
to output various analytics tables and custom charts.

Parameters
----------

.. code:: typescript

    interface EvaStateHistoryParams {
      oid: string | Array<string>;
      timeframe: string | Array<string>;
      update?: number;
      prop?: StateProp;
      fill?: string;
      args?: any;
      engine?: Eva;
    }

* **timeframe** contains a single or multiple time frames (see
  :ref:`eva4_hmi_http__item.state_history` for time frame format). The time
  frame can be specified as *START:END*, e.g. to output the data for the
  previous hour: *2H:1H*.

* **update** update interval in seconds (default: 1 sec)

* **fill** filling interval (see :ref:`eva4_hmi_http__item.state_history`)

* **args** extra API call arguments

Output
------

.. code:: typescript

    interface StateHistoryData {
      data: any;
      error?: EvaError;
    }

Usage example
-------------

.. code:: jsx

   import { useEvaStateHistory } from "@eva-ics/webengine-react";

   const MyComponent = () => {
     const state = useEvaStateHistory({
         oid: "sensor:env/temp",
         timeframe: "1D",
         update: 1
     });

     // ...

   }

The *state.data* variable contains :ref:`item.state_history
<eva4_hmi_http__item.state_history>` API call result, which is updated with
the specified interval.

In case of API call error, *state.error* is filled with error information.

.. _eva_webengine_react_use_evaapicall:

useEvaAPICall
=============

React hook, which contains :doc:`../eva4/svc/eva-hmi` API call result. The
result payload is automatically updated with the specified interval.

Parameters
----------

.. code:: typescript

    interface EvaAPICallParams {
      method: string;
      params?: object;
      update?: number;
      engine?: Eva;
    }

* **update** update interval in seconds (default: 1 sec)

Output
------

.. code:: typescript

    interface APICallData {
      data: any;
      error?: EvaError;
    }

Usage example
-------------

.. code:: jsx

   import { useEvaAPICall } from "@eva-ics/webengine-react";

   const MyComponent = () => {
     const result = useEvaAPICall({
       method: "bus::sim.modbus.sensor1::get",
       update: 1
     });

     let value = result.data?.value;
     return <span>{value}</span>;
   }

The *result.data* variable contains API call result, which is updated with the
specified interval.

In case of API call error, *result.error* is filled with error information.
