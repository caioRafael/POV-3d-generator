import { ParameterForm } from "@/components/feature/parameter-form";
import { PreviewProvider } from "@/components/feature/preview-context";
import { Viewer } from "@/components/feature/viewer";

export default function Home() {
  return (
    <PreviewProvider>
      <div className="grid grid-cols-[300px_1fr] min-h-screen">
        <div className="flex flex-col items-center p-4 gap-2 border-r">
          <h1 className="text-2xl font-bold">3Dev</h1>

          <ParameterForm />
        </div>
        <div className="">
            <Viewer />
        </div>
      </div>
    </PreviewProvider>
  );
}
