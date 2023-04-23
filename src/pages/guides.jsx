import Layout from "@/components/Layout"
import Image from 'next/image'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function Guides() {

    return (
        <Layout>
            <div className="py-24">
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList>
                        <Tab>Metamask Setup</Tab>
                        <Tab>Goerli Faucet</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Image src="/assets/png/veritru-user-guide-metamask-1.png" className="w-full" alt="VeriTru User Guide 1" width="1200" height="720" unoptimized priority />
                        </TabPanel>
                        <TabPanel>
                        <Image src="/assets/png/veritru-user-guide-metamask-2.png" className="w-full" alt="VeriTru User Guide 2" width="1200" height="720" unoptimized priority />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                
            </div>
        </Layout>
    )
}