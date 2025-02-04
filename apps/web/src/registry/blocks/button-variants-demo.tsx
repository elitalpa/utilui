import { Button } from "@/components/utilui/button";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Button>Default Button</Button>
      <Button variant={"secondary"}>Secondary Button</Button>
      <Button variant={"destructive"}>Destructive Button</Button>
      <Button variant={"validate"}>Validate button</Button>
      <Button variant={"outline"}>Outline button</Button>
      <Button variant={"ghost"}>Ghost button</Button>
      <Button variant={"link"}>Link button</Button>
    </div>
  );
}
