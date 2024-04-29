## found this which can be used to bring down test network

pushd ./artifacts/channel
rm -r crypto-config/*
rm genesis.block
rm mychannel.tx
rm Org1MSPanchors.tx
rm Org2MSPanchors.tx
./create-artifacts.sh
popd