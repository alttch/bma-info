.. _eva4_svc_videosrv__rec.image:

rec.image
---------

.. list-table::
   :header-rows: 0

   * - Description
     - *Retrieve an image from a video recording*
   * - Parameters
     - required
   * - Returns
     - Vec<u8> of the image data (PNG) or null if no image is found

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t**
     - f64
     - Timestamp (seconds since epoch)
     - **yes**
   * - **max_delta**
     - f64
     - Maximum time difference (seconds) from the requested timestamp
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-videosrv/rec.image.req
    :response: ../../http_api_examples/eva-svc-videosrv/rec.image.resp


.. _eva4_svc_videosrv__rec.info:

rec.info
--------

.. list-table::
   :header-rows: 0

   * - Description
     - *Get video recording information*
   * - Parameters
     - required
   * - Returns
     - Video recording information

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t**
     - f64
     - Timestamp (seconds since epoch) to get information for
     - no
   * - **limit**
     - u32
     - Maximum number of frames to analyze
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-videosrv/rec.info.req
    :response: ../../http_api_examples/eva-svc-videosrv/rec.info.resp


.. _eva4_svc_videosrv__rec.segmented:

rec.segmented
-------------

.. list-table::
   :header-rows: 0

   * - Description
     - *Retrieve a segmented video from a video recording*
   * - Parameters
     - required
   * - Returns
     - Array of frames with metadata

.. list-table:: Parameters
   :align: left

   * - Name
     - Type
     - Description
     - Required
   * - **k**
     - String
     - valid API key/token
     - **yes**
   * - **i**
     - String
     - Stream sensor OID
     - **yes**
   * - **t**
     - f64
     - Timestamp (seconds since epoch)
     - **yes**
   * - **limit_min**
     - u32
     - Minimum number of frames to include in the segment
     - **yes**
   * - **limit_max**
     - u32
     - Maximum number of frames to include in the segment
     - no

..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-videosrv/rec.segmented.req
    :response: ../../http_api_examples/eva-svc-videosrv/rec.segmented.resp


