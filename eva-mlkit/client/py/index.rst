Python client
*************

EVA ICS machine learning kit Python library can work both with and with no
server installed. If there is no server installed, data is processed on the
client side.

Installation
============

Workstation/standalone
----------------------

.. code:: shell

    pip3 install evaics.ml


EVA ICS venv
------------

.. code:: shell

    eva venv add evaics.ml

Querying data
-------------

Lazy initialize a request (HTTP)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    from evaics.client import HttpClient

    # the import automatically enabled additional client methods
    import evaics.ml

    client = HttpClient('http://127.0.0.1:7727',
                             user='operator', password='xxx')
    # If Machine learning kit server is used with a front-end and API methods
    # are mapped to the same port, the variable can be just set to True.
    # If the Machine learning kit server is not installed, do not set this
    # variable or set it to None
    client.mlkit = 'http://127.0.0.1:8811'

    # initialize an empty request
    req = client.history_df()

Lazy initialize a request (BUS/RT)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

BUS/RT access requires ML kit server to be deployed.

.. code:: python

    # initialize BUS/RT if not connected. Not required for EVA ICS Python
    # services and Python macros 

	bus = busrt.client.Client('/opt/eva4/var/bus.ipc', 'test-py')
    bus.connect()

    client = busrt.rpc.Rpc(bus)
    # the name of ML kit server service instance
    client.mlkit = 'eva.svc.ml'

    # initialize an empty request
    req = client.history_df()

Initialize a request (any supported client)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    from evaics.client import HttpClient
    from evaics.ml import HistoryDF

    client = HttpClient('http://127.0.0.1',
                             user='operator', password='xxx')

    req = HistoryDF(client).with_mlkit(True)

OID mapping
~~~~~~~~~~~



OID mapping from CSV file
~~~~~~~~~~~~~~~~~~~~~~~~~
