"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PaginationBar({ page, setPage, total, totalPages, pageSize }) {
  if (totalPages <= 1) return null;

  return (
    <>
      <Separator />
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(1)} disabled={page === 1}>
            « First
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            ‹ Prev
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next ›
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            Last »
          </Button>
        </div>
      </div>
    </>
  );
}
