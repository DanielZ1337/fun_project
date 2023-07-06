import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@/components/breadcrumb";

export const metadata = {
    title: "Breadcrumb",
}

export default function Page() {

    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage={true}>
                    <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}