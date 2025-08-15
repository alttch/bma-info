EVA ICS WebEngine Multimedia
****************************

Contains web multimedia components for the EVA ICS platform.

* API: https://pub.bma.ai/dev/docs/eva-webengine-multimedia/
* Source: https://github.com/eva-ics/eva-webengine-multimedia
* NPM package: https://www.npmjs.com/package/@eva-ics/webengine-multimedia

.. contents::

Description
===========

Provides video decoding and playing components to use with EVA ICS binary streams.

Example: video playback
=======================

.. note::

   Video decoding in web browser requires secure connection (HTTPS). See :doc:`../eva4/hmi/frontend`.

.. code-block:: typescript

   import {
     EvaLivePlayer,
     EvaPlayerAutoSize,
     set_engine
   } from "@eva-ics/webengine-multimedia";

   // set a web engine instance for the multimedia library, not required if WebEngine React is used
   set_engine(eva);

   const canvas = document.querySelector<HTMLCanvasElement>("#videostream1")!;
   canvas.addEventListener("click", () => {
       player.togglePause();
   });
   const player = new EvaLivePlayer({
    canvas: canvas,
    name: "s0",
    autoSize: EvaPlayerAutoSize.None,
   });
   player.start("sensor:streams/s0");


