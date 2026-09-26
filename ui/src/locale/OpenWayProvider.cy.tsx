import React, { useState } from "react";
import { OpenWayProvider } from "./OpenWayProvider";
import { enUS } from "./enUS";
import { viVN } from "./viVN";
import ConfirmFooter from "../components/confirm/ConfirmFooter";
import Empty from "../components/empty/Empty";
import Button from "../components/button/Button";

function DynamicLocaleDemo() {
  const [locale, setLocale] = useState(enUS);

  return (
    <OpenWayProvider locale={locale}>
      <div className="p-6 space-y-6">
        <div className="flex gap-2">
          <Button
            size="sm"
            data-testid="switch-en"
            onClick={() => setLocale(enUS)}
          >
            Switch to EN
          </Button>
          <Button
            size="sm"
            data-testid="switch-vi"
            onClick={() => setLocale(viVN)}
          >
            Switch to VI
          </Button>
        </div>

        <div data-testid="confirm-container">
          <ConfirmFooter />
        </div>

        <div data-testid="empty-container">
          <Empty />
        </div>

        <div data-testid="override-container">
          <ConfirmFooter confirmText="Custom Button Text" />
        </div>
      </div>
    </OpenWayProvider>
  );
}

describe("OpenWayProvider Component Tests", () => {
  it("Mặc định không bọc Provider hiển thị Tiếng Anh (enUS)", () => {
    cy.mount(
      <div className="p-6 space-y-4">
        <div data-testid="default-confirm">
          <ConfirmFooter />
        </div>
        <div data-testid="default-empty">
          <Empty />
        </div>
      </div>
    );

    // Nút xác nhận mặc định là "Confirm" và "Cancel"
    cy.get('[data-testid="default-confirm"]').should("contain.text", "Confirm");
    cy.get('[data-testid="default-confirm"]').should("contain.text", "Cancel");

    // Empty state mặc định là "No data"
    cy.get('[data-testid="default-empty"]').should("contain.text", "No data");
  });

  it("Khi bọc OpenWayProvider locale={viVN} tự động chuyển sang Tiếng Việt", () => {
    cy.mount(
      <OpenWayProvider locale={viVN}>
        <div className="p-6 space-y-4">
          <div data-testid="vi-confirm">
            <ConfirmFooter />
          </div>
          <div data-testid="vi-empty">
            <Empty />
          </div>
        </div>
      </OpenWayProvider>
    );

    // Nút xác nhận chuyển thành "Xác nhận" và "Hủy"
    cy.get('[data-testid="vi-confirm"]').should("contain.text", "Xác nhận");
    cy.get('[data-testid="vi-confirm"]').should("contain.text", "Hủy");

    // Empty state chuyển thành "Không có dữ liệu"
    cy.get('[data-testid="vi-empty"]').should("contain.text", "Không có dữ liệu");
  });

  it("Chuyển đổi ngôn ngữ động phản ứng tức thì và ưu tiên prop override", () => {
    cy.mount(<DynamicLocaleDemo />);

    // Ban đầu là EN
    cy.get('[data-testid="confirm-container"]').should("contain.text", "Confirm");
    cy.get('[data-testid="empty-container"]').should("contain.text", "No data");

    // Bấm chuyển sang VI
    cy.get('[data-testid="switch-vi"]').click();
    cy.get('[data-testid="confirm-container"]').should("contain.text", "Xác nhận");
    cy.get('[data-testid="empty-container"]').should("contain.text", "Không có dữ liệu");

    // Kiểm tra Prop override luôn được ưu tiên
    cy.get('[data-testid="override-container"]').should("contain.text", "Custom Button Text");

    // Bấm chuyển lại EN
    cy.get('[data-testid="switch-en"]').click();
    cy.get('[data-testid="confirm-container"]').should("contain.text", "Confirm");
    cy.get('[data-testid="empty-container"]').should("contain.text", "No data");
  });
});
