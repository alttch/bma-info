The service is used to run a `GStreamer <https://gstreamer.freedesktop.org/>`_
pipeline to process audio and video streams, where both pipeline ends are EVA
ICS sensors with binary values.

The service is useful for various scenarios:

* Decoding video frames to raw images for further algorithmic or AI (computer
  vision) processing.

* Transcoding video streams to different formats or resolutions.

* Extracting or modifying certain parts of images (cropping/transforming/etc).

.. include:: ../include/gst.rst
