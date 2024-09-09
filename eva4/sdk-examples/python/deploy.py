from evaics.deploy import (Deploy, Node, Service, Item, User, Upload, service_from_tpl,
                    DataObject, Alarm, EAPICall, Function, load_deploy)

# create a node object (if no name is provided, the local node is used)
n = Node()
# set a parameter
n.param('filemgr_svc', 'eva.filemgr.main')
# create a sensor element with an initial value of 25
sensor1 = Item('sensor:test').set('value', 25)
n.add_element(sensor1)

# add a unit with a service action mapped
n.add_element(
    Item('unit:t1').action_svc('eva.controller.plc1').action_timeout(10))

# add another unit, set service action using set method with path
n.add_element(Item('unit:t2').set('action/svc', 'eva.controller.plc2'))

# add a user
n.add_element(User('admin2').set('acls', ['admin']))
# add a file upload element
n.add_element(Upload('http://bma.ai/file.txt', 'plant/'))
# add a service element
n.add_element(
    Service('eva.controller.plc1',
            'eva-controller-enip').user('eva').workers(5))
# add another service element, load the service configuration from a template
n.add_element(
    service_from_tpl('eva.controller.plc1',
                     '/opt/eva4/share/svc-tpl/svc-tpl-controller-modbus.yml'))
# add a data object element
n.add_element(DataObject('sensor').field('value', 'float'))
# add an alarm element
n.add_element(Alarm('sensor', 'high', 2))
# add an EAPI call element (executed after the node deployment)
n.add_element(EAPICall('test'))
# add a function element (executed after the node deployment)
n.add_element(Function('sleep', 5))
# same function, but with set method
n.add('extra/deploy/after', dict(function='sleep', args=[5]))
# add more data from an export file
n.add_from_export('items.yml')

# create a deploy object
deploy = Deploy()

# add the node to the deploy object
deploy.add(n)

# save the deploy object to a file
deploy.save('test.yml')

# load the deploy object from a file
d = load_deploy('test.yml')

# print the deploy object
print(d)
