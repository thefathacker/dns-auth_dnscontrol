# dns-auth
 DNSControl Configuration for Authoritive DNS Servers

## Installation
```
# wget -c https://dl.google.com/go/go1.14.9.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
sudo apt install -y bind9
cd /etc/bind
# sudo GO111MODULE=on /usr/local/go/bin/go get github.com/StackExchange/dnscontrol/v3
sudo rm named.*
sudo git init
# sudo ln -s /var/cache/bind /etc/bind/zones
sudo git pull https://github.com/thefathacker/dns-auth
# sudo /root/go/bin/dnscontrol push
sudo systemctl restart bind9
```

## Run DNSControl
```
cd /etc/bind
sudo git pull https://github.com/thefathacker/dns-auth
sudo /root/go/bin/dnscontrol push
sudo rndc reload
sudo systemcrl restart bind9.service (Optional)
```