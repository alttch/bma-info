HMI file uploads
****************

:doc:`../svc/eva-hmi` has got a special HTTP method to handle uploads.

.. code-block:: bash

    http(s)://<IP/DOMAIN>[:PORT]>/upload

The method accepts standard multipart-form data requests and processes them
with :ref:`eva4_lmacro`.

.. contents::

File upload form
================

How does it work
----------------

An upload form can be either standard HTML web-form or AJAX-based. Here is an
example of the standard one:

.. code:: html

    <form action="/upload" method="POST" enctype="multipart/form-data">
        Select file to upload:
        <input type="file" name="upload_file">
        <input type="hidden" name="redirect" value="/ui/upload_example.html">
        <input type="hidden" name="process_macro_id" value="lmacro:tests/upload_handler">
        <input type="submit" value="Upload file" name="submit">
    </form>

What happens, when a file is uploaded and the method is called:

* The form parameters are checked, *upload_file* (alias: *ufile*) and
  "process_macro_id" are mandatory
* If there is a file to upload chosen, the macro with OID, specified in
  "process_macro_id" is called.
* If there is "redirect" form parameter set, the method performs redirect to
  the specified URI
* Otherwise, the method returns JSON output of macro execution result:

.. code:: json

    {
      "err": null,
      "exitcode": 0,
      "finished": true,
      "node": "mws1",
      "oid": "lmacro:tests/upload_handler",
      "out": "upload completed",
      "params": {
        "kwargs": {
          "content": "<binary>",
          "data": {
            "aci": {
              "acl": "admin",
              "auth": "key",
              "token_mode": null,
              "u": null
            },
            "content_type": "application/octet-stream",
            "file_name": "1.c",
            "form": {
              "submit": "Upload file"
            },
            "sha256": "9665be413470b347a2bcc35030c794427b803a4768a0edbbb58897aeeea3f244",
            "system_name": "mws1"
          }
        }
      },
      "priority": 100,
      "status": "completed",
      "svc": "eva.controller.py",
      "time": {
        "accepted": 1652404284.8615384,
        "completed": 1652404284.8618288,
        "created": 1652404284.8603165,
        "pending": 1652404284.861556,
        "running": 1652404284.8616025
      },
      "uuid": "2df9dd22-78a3-414c-800b-3c0b6da80fc8"
    }

Errors
------

* 400 (Bad Request) - invalid HTTP request or "upload_file" /
  "process_macro_id" parameters are not set

* 404 (Not Found) - the macro with the specified id is not found
* 403 (Forbidden) - the user has no access to the requested macro
* 500 (API Error) - all other errors

In case if the file is not specified and "redirect" parameter is not set, the
method returns:

.. code:: json

    { "ok": false }

Additional form parameters
--------------------------

* **k** API key (set automatically by `EVA JS Framework
  <https://github.com/alttch/eva-js-framework>`_ version 0.3.9 or above)

* **wait** (**w**) seconds to wait until macro execution is completed

* **priority** (**p**): macro queue priority (default is 100, lower is better)

* all other parameters are sent to macro as a map *data["form"]*

Processing macro
================

When the file upload is completed, :ref:`eva4_lmacro` is started, so the
content is actually transferred for processing to the node, where this lmacro
is located.

The processing lmacro automatically gets these parameters:

* **content** content of the uploaded file (binary)
* **data** upload information data:

    * **aci** API call info struct
    * **content_type** file content type, reported by client
    * **file_name** file name, reported by client
    * **form** the map of all additional upload form parameters
    * **sha256** SHA256-checksum of the uploaded file (calculated by the HMI
      service)
    * **system_name** node name, the file is coming from

Here's an example of a simple :doc:`Python macro <../lmacro/py/python_macros>`,
which stores uploaded files in /tmp:

.. code:: python

    print(f'uploading file {data["file_name"]}')
    assert data['sha256'] == sha256sum(content)
    with open('/tmp/' + data['file_name'], 'wb') as fh:
        fh.write(content)
        out = 'upload completed'


Security and file upload limits
===============================

* To upload files, the user session/API key MUST have an access to the
  corresponding processing lmacro.

* There's no built-in limitations for uploaded file size, but the limit can be
  set using an additional :doc:`front-end server <../hmi/frontend>` used.
