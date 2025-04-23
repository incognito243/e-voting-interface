import {ArrowBackIcon} from "@/constant/icon";
import {TypoTitle} from "@/components/Common/Typo/TypoTitle";
import {useRouter} from "next/navigation";

export function BackButton({ backPath }: { backPath: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push(backPath)}>
      <ArrowBackIcon size={16} color={"#9ac2c2"} />
      <TypoTitle size={2}>Back</TypoTitle>
    </div>
  );
}
