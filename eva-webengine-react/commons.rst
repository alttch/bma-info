Commons
*******

.. contents::

Default web engine
==================

All library components require *engine* parameter which must contain an object
with class *Eva* (see :doc:`../eva-webengine/api`).

The arguments can be omitted if the default web engine object is set:

.. code:: typescript

   import { Eva } from "@eva-ics/webengine";
   import { set_engine } from "@eva-ics/webengine-react";

   const eva = new Eva();

   set_engine(eva);

Creating a new project
======================

Let us create a new web project with `Vite <https://vitejs.dev/>`_:

.. code:: shell

   npx --yes create-vite hmi1 --template react-ts
   cd hmi
   npm install
   npm install --save @eva-ics/webengine-react

Modify *main.tsx* as the following:

.. code:: react

    eva.load_config().then(() => {
      ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        // uncomment in production
        //<React.StrictMode> 
          <HMIApp engine={eva} Dashboard={HmiDashboard} />
        //</React.StrictMode>
      );
    });

where *Dashboard* is a React component, which appears after a user is
successfully authenticated.

Create a file *public/config.json* (see :doc:`../eva-webengine/config`), which
contains at least HMI API URI:

.. code:: json

    {
      "engine": {
        "api_uri": "http://yourhost:port"
      }
    }

See :doc:`WebEngine Quick start <../eva-webengine/quickstart>` and :doc:`EVA
ICS v4 Quick start <../eva4/quickstart>` about how to build and deploy the web
application.

Single-page applications
========================

See :ref:`eva_webengine-spa`.
