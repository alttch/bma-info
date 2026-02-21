MCP service allows to connect AI agents directly to EVA ICS control bus.

This allow agents to solve various tasks, such as:

* Perform automatic components deployment and configuration
* Automatic monitoring and diagnostics
* State and data analysis
* Predictive maintenance
* Anomaly detection
* Process optimization
* Natural language interface for operators
* Automated reporting and documentation

Safety and security
===================

.. warning::

   AI agents can perform unpredictable actions, on production plants it is
   strongly advised to allow very minimal set of services/methods allowed to be
   called. Full human supervision is always recommended.

The service has no authentication and can provide full access to the platform
control bus.

After deploying, protect the MCP server with a Web Application (WAF, e.g.
:doc:`Gateryx <../../../gateryx/index>`) or L4-firewall to allow access from
trusted sources only.

For mission-critical systems, it is recommended to create a dedicated
"read-only" node, which replicates states of the real one and deploy MCP
service on it.

Note that integration of "big" AI models into industrial automation systems is
still experimental practice. Supervision from the product vendor or integrators
is strongly advised.

Configuring agents
==================

The MCP URL is `http://node_ip:8765/mcp` and it accepts standard JSON-RPC 2.0
requests. The agents get methods "help" which guides them with basic
information and rules how to access `DeepWiki <https://deepwiki.com/>`_ and
official EVA ICS documentation. Refer to your agent documentation for more
details.

Example for `Cursor <https://cursor.com>`_ agent (`~/.cursor/mcp.json`):

.. code:: json

   "eva-node-1": {
      "url": "http://node_ip:8765/mcp",
      "headers": {}
    }

(add required authentication headers for WAF if applicable).

Recommended initial prompt
==========================

The conversation (or rules, agent files) should contain a phrase like

..

    you are connected to the system .....

This tells the agent to immediately check the MCP servers provided.

Troubleshooting
===============

.. note::

    Certain agents may require restarting if MCP service has been restarted or
    connection has been lost.

MCP is still an experimental technology and issues may occur. Known issues
reported:

* Cursor GUI agent does not see MCP tools. Use Cursor CLI version instead until
  the issue is resolved.
