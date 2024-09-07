
.. py:module:: evaics.ml


.. py:class:: HistoryDF(client, params_csv: Optional[str] = None)
   :module: evaics.ml

   Fetches data from EVA ICS v4 history databases
   
   When the primary module is imported, the method "history_df()" is
   automatically added to evaics.client.HttpClient
   
   Create HistoryDF object instance
   
   All configuration methods of the class can be used in chains.
   
   :param client: HTTP client object
   
   Optional:
       params_csv: CSV file or stream to read parameters from
   
   
   .. py:method:: HistoryDF.database(database: str)
      :module: evaics.ml
   
      Specify a non-default database
      
      :param database: database name (db service without eva.db. prefix)
      
   
   .. py:method:: HistoryDF.fetch(t_col: str = 'keep', tz: str = 'local', output='arrow', strict_col_order=True)
      :module: evaics.ml
   
      Fetch data
      
      Optional:
          output: output format (arrow, pandas or polars)
          t_col: time column processing, "keep" - keep the column, "drop" -
          drop the time column
          tz: time zone (local, custom or None to keep time column as UNIX
          timestamp), the default is "local"
          strict_col_order: force strict column ordering (default: True)
      
      
      :returns: a prepared Pandas DataFrame object
      
   
   .. py:method:: HistoryDF.fill(fill: str)
      :module: evaics.ml
   
      Fill the data frame
      
      :param fill: XN, where X - integer, N - fill type (S for seconds, T for
                   minutes, H for hours, D for days, W for weeks), e.g. 15T for
                   15 minutes. The values can be rounded to digits after comma
                   as XN:D, e.g 15T:2 - round to 2 digits after comma. The
                   default fill is 1S
      
   
   .. py:method:: HistoryDF.limit(limit: int)
      :module: evaics.ml
   
      Limit the data frame rows to
      
      :param limit: max number of rows
      
   
   .. py:method:: HistoryDF.oid(oid: Union[evaics.sdk.OID, str], status=False, value=False, database=None, xopts=None)
      :module: evaics.ml
   
      Append OID for processing
      
      :param oid: item OID (string or OID object)
      
      Optional:
          status: True to keep, a string to rename, False to drop
          value: same behavior as for keep
          database: db service to query data from (mlkit srv only)
          xopts: db service extra opts (mlkit srv only)
      
   
   .. py:method:: HistoryDF.push(data, database='default')
      :module: evaics.ml
   
      Push data
      
      Requires ML kit server
      
      Options:
          data: Pyarrow table, file object or file path
          database: database svc id (default: default)
      
   
   .. py:method:: HistoryDF.read_params_csv(f: str)
      :module: evaics.ml
   
      Read OID mapping from a CSV file
      
      CSV file must have the column "oid" and optional ones "status", "value"
      and "database"
      
      :param f: file path or buffer
      
   
   .. py:method:: HistoryDF.t_end(t_end: Union[float, str])
      :module: evaics.ml
   
      Specify the data frame end time
      
      :param t_start: a float (timestamp), a string or a datetime object
      
   
   .. py:method:: HistoryDF.t_start(t_start: Union[float, str, datetime.datetime])
      :module: evaics.ml
   
      Specify the data frame start time
      
      :param t_start: a float (timestamp), a string or a datetime object
      
   
   .. py:method:: HistoryDF.with_mlkit(mlkit: Union[bool, str])
      :module: evaics.ml
   
      Set ML kit url/svc name
      
      :param mlkit: True for the same URL as HMI, svc name or url for other
      
   
   .. py:method:: HistoryDF.xopts(xopts: dict)
      :module: evaics.ml
   
      Extra database options
      
      :param xopts: dict of extra options (refer to the EVA ICS database service
      :param documentation for more info):
      
