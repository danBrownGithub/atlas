
import socket
import struct
multicast_group ='232.1.1.1'
server_address = ('', 1235)

s= socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(server_address)

group = socket.inet_aton(multicast_group)
mreq = struct.pack('4sL', group, socket.INADDR_ANY)
s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP,mreq)
data, address = s.recvfrom(1024)
print(data)
