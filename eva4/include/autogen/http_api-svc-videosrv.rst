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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "rec.image",
    "params": {
      "i": "sensor:s0",
      "k": "secretkey",
      "t": 1625079600.0
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 82
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": "image data (bytes) or null"
  }



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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "rec.info",
    "params": {
      "i": "sensor:s0",
      "k": "secretkey"
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 138
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": {
        "format": 10,
        "fps": 60,
        "height": 480,
        "width": 640
      }
  }



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

..
  Request example (JSON RPC 2.0):
  POST /jrpc HTTP/1.1
  accept: application/json
  content-type: application/json
  host: localhost:7727

  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "rec.segmented",
    "params": {
      "i": "sensor:s0",
      "k": "secretkey",
      "limit_min": 100,
      "t": 1625079600.0
    }
  }

  Response example:

  HTTP/1.1 200 OK
  cache-control: no-cache, no-store
  content-length: 1077
  content-type: application/json
  date: Thu, 13 Aug 2021 00:00:00 GMT
  expires: 0
  pragma: no-cache

  {
      "id": 1,
      "jsonrpc": "2.0",
      "result": [
      {
          "data": [
              69,
              86,
              83,
              235,
              174,
              186,
              235,
              174,
              186
          ],
          "key_unit": true,
          "t": 1755203121.461881
      },
      {
          "data": [
              69,
              86,
              83,
              1,
              10,
              128,
              2,
              224,
              1,
              0,
              0,
              0,
              0
          ],
          "key_unit": false,
          "t": 1755203121.478216
      },
      {
          "data": [
              69,
              86,
              83,
              1,
              10,
              128,
              2,
              224,
              1,
              0,
              0
          ],
          "key_unit": false,
          "t": 1755203121.494861
      },
      {
          "data": [
              69,
              86,
              83,
              1,
              10,
              128
          ],
          "key_unit": false,
          "t": 1755203121.511463
      }
      ]
  }



..  http:example:: curl wget httpie python-requests
    :request: ../../http_api_examples/eva-svc-videosrv/rec.segmented.req
    :response: ../../http_api_examples/eva-svc-videosrv/rec.segmented.resp


