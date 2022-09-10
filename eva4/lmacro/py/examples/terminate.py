try:
    terminate('unit:tests/unit1')
except ResourceNotFound:
    print('no action running')
