Binary streams (Video/Audio/Custom)
***********************************

The binary stream technology provides ability to send and receive binary data
streams via :doc:`EVA ICS items <./items>`.

This allows to use EVA ICS nodes to collect, transfer and process various
binary data, such as video, audio, images or custom binary streams.

.. contents::

.. figure:: schemas/videostreams.png
    :width: 595px
    :alt: Video streams

General information
===================

It is recommended to use :ref:`eva4_sensor` item type for binary streams.

The sensor value contains either `null` (the stream is ended or inactive) or
the current binary stream frame. The connected components can subscribe to the
item state and receive the binary stream frames as soon as they arrive.

See also: :ref:`eva4_item_binary_values`.

Preparing the system
====================

As binary stream frames are usually relatively large, it is recommended to
review service subscriptions (databases, :doc:`./svc/eva-hmi` etc.) and exclude
sensor groups with binary streams from real-time processing unless the service
supports such kind of data.

External applications not connected directly to the local node bus (such as web
applications) can obtain binary stream data via HMI WebSocket API (See
:ref:`eva4_hmi_ws__stream.start`). When an external client is connected, the bus
subscription is made automatically on-demand.

Multimedia streams in web applications
======================================

See :doc:`../eva-webengine/multimedia` and
:doc:`../eva-webengine-react/components/evaliveplayer`.

.. note::

   Video decoding in web browser requires secure connection (HTTPS). See :doc:`./hmi/frontend`.

Stream replication between nodes
================================

The binary streams are automatically replicated between nodes, no special
configuration is required. Certain setups may require a dedicated
:doc:`./svc/eva-repl` or :doc:`./svc/eva-zfrepl` instance with the parameters
tuned, e.g. data compression may be not required if a stream already contains
compressed data.

Sinking data into streams
=========================

Video sink controller
---------------------

See :doc:`./svc/eva-videosink`.

.. _eva4_gst_plugins:

GStreamer plugins
-----------------

EVA ICS provides a set of GStreamer plugins to work with binary media streams.

The recent plugin library can be downloaded from: https://pub.bma.ai/eva-gst/

Download the latest plugin version and rename it to `libgsteva.so`

Sink pipeline example:

.. code:: shell

    GST_PLUGIN_PATH=/path/to/libdir gst-launch-1.0 videotestsrc  ! \
        'video/x-raw,format=I420,width=640,height=480' ! openh264enc ! \
        evasink oid=sensor:streams/0

Source pipeline example:

.. code:: shell

    GST_PLUGIN_PATH=/path/to/libdir gst-launch-1.0 evasrc oid=sensor:streams/0 ! \
        openh264dec ! \
        autovideosink

In case if a pipeline is executed on a remote host, use `bus-path` parameter
(see: :ref:`eva4_config_bus`) to connect to the node bus via TCP socket.

Custom applications
-------------------

Using :doc:`./sdk/index`, it is possible to create custom applications that can
send and receive binary streams. EVA ICS SDK provides easy-to-use methods to
manipulate and process item values, the same methods are used for binary
streams.

The video stream sensor header value must have the following format:

=====  ==================================================
Byte   Description
=====  ==================================================
0-2    Magic: EVS (0x45, 0x56, 0x53)
3      Version (1)
4      Format (codec)
5-6    Width (little-endian)
7-8    Height (little-endian)
9      Flags (bit 0 = key frame, other bits are reserved)
=====  ==================================================

Rest of the value contains the video frame data in the specified format.

Formats defined:

====  ============================
Code  Description
====  ============================
0     Raw uncompressed or a custom
10    H.264
11    H.265
12    VP8
13    VP9
14    AV1
====  ============================

.. note::

   Color format for raw uncompressed video is not stored, the user must
   manually ensure the correct color format is used for a sensor in all
   applications and pipelines. The default interpretation is RGB8.
