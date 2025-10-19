import { Detail } from "@/entities/detail";
import { DetailFooter } from "@/widgets/Detail/DetailFooter";

interface SearchParamsProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: SearchParamsProps) {
  const { id } = (await params);

  return (
    <div className="mx-auto w-full md:w-[568px] lg:w-[768px] py-20">
        <Detail id={id}/>
        <DetailFooter />
    </div>
  );
}
