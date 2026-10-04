import React from "react";
import { Toaster, toast } from "./index";
import { Button } from "../button";

describe("<Toaster /> & toast API Comprehensive Verification", () => {
  it("verifies toast.success, toast.error, toast.warning, toast.info, toast.loading, toast.promise and dismiss", () => {
    const ToastShowcase = () => {
      const handleTriggerPromise = () => {
        const fakePromise = new Promise<{ name: string }>((resolve) => {
          setTimeout(() => {
            resolve({ name: "Báo cáo doanh thu Q3" });
          }, 300);
        });

        toast.promise(fakePromise, {
          loading: "Đang tạo báo cáo...",
          success: (data) => ({
            title: "Tạo báo cáo thành công!",
            description: `Tệp "${data.name}" đã sẵn sàng tải xuống.`,
          }),
          error: "Không thể tạo báo cáo.",
        });
      };

      return (
        <div className="p-8 bg-neutral-50 min-h-screen text-neutral-900 space-y-6 max-w-4xl mx-auto font-sans relative">
          <Toaster position="top-right" duration={3000} />

          <div className="border-b border-neutral-200 pb-4">
            <h1 className="text-2xl font-bold text-neutral-900">Toast Notifications (Powered by Sonner & Alert)</h1>
            <p className="text-sm text-neutral-500 mt-1">
              Kiểm thử toàn diện các phương thức toast: success, error, warning, info, loading, promise và dismiss.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl border border-neutral-200 shadow-xs">
            <Button
              data-testid="btn-toast-success"
              color="success"
              variant="filled"
              onClick={() => toast.success("Thành công!", "Dữ liệu người dùng đã được cập nhật.")}
            >
              toast.success
            </Button>

            <Button
              data-testid="btn-toast-error"
              color="error"
              variant="filled"
              onClick={() => toast.error("Đã xảy ra lỗi!", "Không thể kết nối tới máy chủ.", { variant: "filled" })}
            >
              toast.error (filled)
            </Button>

            <Button
              data-testid="btn-toast-warning"
              color="warning"
              variant="filled"
              onClick={() => toast.warning("Cảnh báo dung lượng", "Bộ nhớ lưu trữ sắp đầy.")}
            >
              toast.warning
            </Button>

            <Button
              data-testid="btn-toast-info"
              color="info"
              variant="filled"
              onClick={() => toast.info("Thông báo hệ thống", "Có bản cập nhật mới.")}
            >
              toast.info
            </Button>

            <Button
              data-testid="btn-toast-loading"
              color="secondary"
              variant="outline"
              onClick={() => toast.loading("Đang đồng bộ dữ liệu...")}
            >
              toast.loading
            </Button>

            <Button
              data-testid="btn-toast-promise"
              color="primary"
              variant="filled"
              onClick={handleTriggerPromise}
            >
              toast.promise
            </Button>

            <Button
              data-testid="btn-toast-dismiss"
              color="neutral"
              variant="outline"
              onClick={() => toast.dismiss()}
            >
              toast.dismiss all
            </Button>
          </div>
        </div>
      );
    };

    cy.mount(<ToastShowcase />);

    // 1. Test toast.success
    cy.get('[data-testid="btn-toast-success"]').click();
    cy.get('[role="status"]').should("be.visible").and("contain.text", "Thành công!");
    cy.get('[role="status"]').should("contain.text", "Dữ liệu người dùng đã được cập nhật.");

    // 2. Test toast.error (filled)
    cy.get('[data-testid="btn-toast-error"]').click();
    cy.get('[role="alert"]').should("be.visible").and("contain.text", "Đã xảy ra lỗi!");
    cy.get('[role="alert"]').should("have.class", "bg-error-600");

    // 3. Test toast.warning
    cy.get('[data-testid="btn-toast-warning"]').click();
    cy.get('[role="alert"]').should("be.visible").and("contain.text", "Cảnh báo dung lượng");

    // 4. Test toast.info
    cy.get('[data-testid="btn-toast-info"]').click();
    cy.get('[role="status"]').should("be.visible").and("contain.text", "Thông báo hệ thống");

    // 5. Test toast.loading
    cy.get('[data-testid="btn-toast-loading"]').click();
    cy.get('[role="status"]').should("be.visible").and("contain.text", "Đang đồng bộ dữ liệu...");

    // 6. Test dismiss all
    cy.get('[data-testid="btn-toast-dismiss"]').click();
    cy.wait(300);

    // 7. Test toast.promise
    cy.get('[data-testid="btn-toast-promise"]').click();
    cy.get('[role="status"]').should("contain.text", "Đang tạo báo cáo...");
    cy.wait(400);
    cy.get('[role="status"]').should("contain.text", "Tạo báo cáo thành công!");
    cy.get('[role="status"]').should("contain.text", 'Tệp "Báo cáo doanh thu Q3" đã sẵn sàng tải xuống.');
  });
});
