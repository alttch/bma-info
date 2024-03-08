.. note::

    **Time convention used in EVA ICS time-frames to fill data:**

    * S for seconds (e.g. 5S for 5 seconds)
    * T for minutes
    * H for hours
    * D for days
    * W for weeks
    * A to get automatic number of records (e.g. 5A for 5 exactly records)

    **Time convention used in EVA ICS to specify start/end of a timeframe:**

    * If there are dedicated parameters for start/end, they are filled
      separately

    * If there is a single parameter only, it is filled either as START:END or
      as START only (END is automatically set to the current time)

    where values must be:

    * UNIX timestamps only (if a parameter is strictly specified as a number)

    * Date in human-readable format (RFC3339 recommended)

    * Using the same notation as for filling. E.g. setting start=30T sets
      time-frame start to 30 minutes before now.

    START value is always mandatory. If END value is required to be set to the
    current time, it can be omitted.
