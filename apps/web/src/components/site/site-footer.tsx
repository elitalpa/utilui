export default function SiteFooter() {
  return (
    <footer className="p-2">
      <div className="container mx-auto flex items-center justify-between rounded-md border bg-background px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {"Built by "}
            <a
              href="https://eli-talpa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              {"@EliTalpa"}
            </a>
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0"></div>
        </div>
      </div>
    </footer>
  );
}
