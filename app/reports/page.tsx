"use client"

import BaseLayout from "../components/BaseLayout";
import PageTitle from "../components/PageTitle"
import Image from "next/image";


const Reports = () => {
    return(
            <BaseLayout>
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                <PageTitle title="This feature will be live soon.." />
                <div className="mx-auto my-auto">
                    <Image src="/working.png" alt="Working image" height={200} width={200} />
                </div>
                </div>
            </div>
            </BaseLayout>
    )
}

export default Reports;