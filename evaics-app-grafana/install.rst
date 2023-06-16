Installation
************

EVA ICS application requires Grafana 9.5.2 or above.

.. contents::

Via Grafana catalog
===================

Not available yet.

Manual
======

* Download the latest application version from
  https://pub.bma.ai/evaics-app-grafana/

* unzip the downloaded archive into Grafana plugins folder (on Linux:
  */var/lib/grafana/plugins*)

* edit Grafana configuration (on Linux: */etc/grafana/grafana.ini*) to allow
  loading the unsigned application plugins:

.. code:: ini

    [plugins]
    # .....
    # .....
    allow_loading_unsigned_plugins = bohemiaautomation-evaics-datasource,bohemiaautomation-evaicsehmi-panel,bohemiaautomation-evaics-app

* restart Grafana server:

.. code:: shell

    systemctl restart grafana-server

* In Grafana UI, go to Administration -> Plugins, select "EVA ICS" application
  plugin and click "Enable" button.
