..
  AUTO-GENERATED, DO NOT MODIFY

EvaLivePlayer
*************

.. contents::

React component. Live video player

.. note::

   Video decoding in web browser requires secure connection (HTTPS). See :doc:`../../eva4/hmi/frontend`.


Example
=======

.. image:: images/evaliveplayer.png
    :width: 300

.. literalinclude:: include/examples/evaliveplayer.tsx
   :language: react

Parameters
===========

.. list-table::
   :header-rows: 1

   * - name
     - type
     - required
     - description
   * - oid
     - string
     - **yes**
     - item OID
   * - streamName
     - string
     - no
     - An optional WebEngine custom stream name
   * - width
     - string | number
     - no
     - video player width
   * - height
     - string | number
     - no
     - video player height
   * - className
     - string
     - no
     - custom CSS class
   * - style
     - React.CSSProperties
     - no
     - custom CSS styles
   * - autoSize
     - EvaLivePlayerAutoSize (enum from eva-webengine-multimedia)
     - no
     - Automatically adjust player size
   * - onError
     - (err: EvaError) => void
     - no
     - Called on stream/decoder errors
   * - onFrame
     - () => void
     - no
     - Called on each video frame
   * - onEOS
     - () => void
     - no
     - Called on end of stream
   * - onChange
     - (info: EvaVideoStreamInfo) => void
     - no
     - Called on stream parameters init / change
   * - onInit
     - (canvas: HTMLCanvasElement) => void
     - no
     - Called on player initialization with the canvas element
   * - setPlayer
     - (player: EvaLivePlayer) => void (class from eva-webengine-multimedia)
     - no
     - Allows to get the player internal instance
   * - decoderHardwareAcceleration
     - boolean
     - no
     - Use hardware acceleration for video decoding (default: true)
   * - decoderFallbackToSoftware
     - boolean
     - no
     - Fallback to software decoding if hardware acceleration fails (default: true)
   * - engine
     - Eva
     - no
     - WebEngine object (if no default set)

Interfaces
===========

EvaLivePlayerParams
-------------------

.. literalinclude:: include/interfaces/evaliveplayerparams.ts
   :language: typescript

