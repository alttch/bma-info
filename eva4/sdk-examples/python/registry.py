#!/opt/eva4/venv/bin/python3

__version__ = '0.0.1'

import evaics.sdk as sdk
import busrt
from evaics.sdk import pack, unpack


def mark_set_up(svc_id, rpc):
    payload = dict(key=f'eva/svc_data/{svc_id}/setup',
                   value=dict(completed=True))
    rpc.call('eva.registry', busrt.rpc.Request('key_set',
                                               pack(payload))).wait_completed()


def run():
    info = sdk.ServiceInfo(author='Bohemia Automation',
                           description='Registry example',
                           version=__version__)
    service = sdk.Service()
    service.init(info)

    # get registry "setup" key
    payload = dict(key=f'eva/svc_data/{service.id}/setup')
    try:
        result = unpack(
            service.rpc.call('eva.registry',
                             busrt.rpc.Request(
                                 'key_get',
                                 pack(payload))).wait_completed().get_payload())
        if result.get('completed') is not True:
            mark_set_up(service.id, service.rpc)
    except busrt.rpc.RpcException as e:
        if e.rpc_error_code == sdk.ERR_CODE_NOT_FOUND:
            # there is no key yet, create it
            mark_set_up(service.id, service.rpc)
        else:
            raise
    # increase service startup counter
    payload = dict(key=f'eva/svc_data/{service.id}/counter')
    counter = unpack(
        service.rpc.call('eva.registry',
                         busrt.rpc.Request(
                             'key_increment',
                             pack(payload))).wait_completed().get_payload())
    service.logger.info(f'The service has been started {counter} time(s)')
    service.block()


run()
