import { Button } from "@/components/utilui/button";

export default function ButtonVariantsDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Button>Default Button</Button>
      <Button variant={"secondary"}>Secondary Button</Button>
      <Button variant={"destructive"}>Destructive Button</Button>
      <Button variant={"warning"}>Warning Button</Button>
      <Button variant={"valid"}>Valid Button</Button>
      <Button variant={"info"}>Info Button</Button>
      <Button variant={"outline"}>Outline Button</Button>
      <Button variant={"ghost"}>Ghost Button</Button>
      <Button variant={"link"}>Link Button</Button>
    </div>
  );
}
