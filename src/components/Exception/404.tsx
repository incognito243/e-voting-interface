"use client";

import {Button, Result} from "antd";
import {useRouter} from "next/navigation";

const E404Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center w-screen h-screen gap-4 transparent-bg">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => {router.back();}}>Back Home</Button>}
      />
    </div>
  );
};

export default E404Page;