The service allows to sink video streams from cameras and other devices.

See more: :doc:`../streams`.

Preparing the system
====================

.. code:: bash

    sudo apt install -y gstreamer1.0-tools \
            gstreamer1.0-plugins-base \
            gstreamer1.0-plugins-good \
            gstreamer1.0-plugins-bad \
            gstreamer1.0-plugins-ugly \
            gstreamer1.0-libav \
            gstreamer1.0-x \
            gstreamer1.0-alsa \
            gstreamer1.0-pulseaudio


Building pipelines
==================

The service uses an embedded GStreamer to get video frames. Refer to the
`GStreamer documentation
<https://gstreamer.freedesktop.org/documentation/index.html>`_ for more
information on how to build pipelines.

Requirements:

* The pipeline must produce `video/x-h264`, `video/x-h265`, `video/x-vp8`,
  `video/x-vp9`, or `video/x-av1` stream.

* The pipeline must not end with a sink, as the service is the sink itself.

* For web playback it is necessary to have the video stream color space set to
  "I420", "NV12" or other modern web-browser compatible format.

* CAPs filtering should not be quoted.

Examples
========

A signal test pipeline:

.. code:: yaml

   # ....
   pipeline: videotestsrc ! video/x-raw,format=I420,width=640,height=480 ! openh264enc
   # ....

A pipeline for a RTSP camera. For H264 make sure the stream-format produced is
byte-stream and alignment is AU. Add `h264parse` element if required:

.. code:: yaml

   # ....
   pipeline: rtspsrc latency=0 location=rtsp://eva:xxx@192.168.20.1/axis-media/media.amp
        ! rtph264depay
        ! h264parse config-interval=-1
        ! video/x-h264,stream-format=byte-stream,alignment=au
   # ....

Including external pipelines
============================

For security purposes, to avoid pipeline duplication or in certain cases where
it may be usable, a pipeline can be included from an external file. Note that
CAPs still do not need to be quoted:

.. code:: yaml

   # ....
   pipeline: ^include /path/to/pipeline
   # ....

Where the included file contains the required pipeline.
