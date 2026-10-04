import React from "react";
import Typography from "./Typography";
import { Text } from "./index";

describe("<Typography /> Notion Design Component Showcase", () => {
  it("renders all typography variants, content blocks, modifiers and interactive features in a single mount", () => {
    const onCopySpy = cy.spy().as("onCopySpy");
    const onExpandSpy = cy.spy().as("onExpandSpy");

    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText").resolves();
    });

    cy.mount(
      <div className="p-8 max-w-4xl mx-auto space-y-8 bg-white font-sans">
        {/* Header Title */}
        <div className="border-b pb-4">
          <Typography type="h2" color="primary">Typography Design System Showcase</Typography>
          <Typography color="gray" size="sm">Toàn bộ biến thể Typography Notion Design System được render trên 1 view duy nhất.</Typography>
        </div>

        {/* 1. Semantic Tags & Heading Levels */}
        <div className="space-y-2">
          <Typography size="xs" weight="semibold" color="gray" className="uppercase tracking-wider">
            1. Semantic Tags & Headings
          </Typography>
          <div className="space-y-2 border rounded-md p-4 bg-neutral-50/30">
            <Typography type="h1">Heading 1 (3xl font-bold)</Typography>
            <Typography type="h2">Heading 2 (2xl font-bold)</Typography>
            <Typography type="h3">Heading 3 (xl font-semibold)</Typography>
            <Typography type="h4">Heading 4 (lg font-semibold)</Typography>
            <Typography type="h5">Heading 5 (base font-semibold)</Typography>
            <Typography type="h6">Heading 6 (sm font-semibold)</Typography>
            <Typography type="p">Paragraph content with standard Notion line-height and relaxed reading flow.</Typography>
            <Text type="h2">Text Alias Heading 2</Text>
            <Typography>Default Text rendered as a span tag</Typography>
          </div>
        </div>

        {/* 2. Notion Content Blocks (code, kbd, blockquote, link, callout) */}
        <div className="space-y-2">
          <Typography size="xs" weight="semibold" color="gray" className="uppercase tracking-wider">
            2. Notion Content Blocks
          </Typography>
          <div className="space-y-3 border rounded-md p-4 bg-neutral-50/30">
            <div>
              <Typography type="code">npm install @openway/ui</Typography>
            </div>
            <div>
              <Typography>Standard text with <Typography code>inline code modifier</Typography> inside.</Typography>
            </div>
            <Typography type="blockquote">
              "Creativity is intelligence having fun." — Albert Einstein
            </Typography>
            <div className="flex items-center gap-2">
              <Typography size="sm">Phím tắt:</Typography>
              <Typography type="kbd">Ctrl</Typography>
              <Typography size="sm">+</Typography>
              <Typography type="kbd">K</Typography>
            </div>
            <div className="flex items-center gap-6">
              <Typography type="a" href="https://openway.dev">
                OpenWay Internal Link
              </Typography>
              <Typography type="a" href="https://openway.dev" external>
                External Link (target _blank)
              </Typography>
            </div>
            <Typography type="callout">
              Important Note: Callout mặc định sử dụng SVG LightbulbIcon theo chuẩn Notion.
            </Typography>
            <Typography type="callout" icon="⚠️" color="orange">
              Warning Note: Cảnh báo với màu cam pastel và icon tùy biến.
            </Typography>
            <Typography type="callout" icon="🚀">
              Launch Info: Callout với icon emoji trực tiếp.
            </Typography>
          </div>
        </div>

        {/* 3. Notion 10 Colors & Highlight Marks */}
        <div className="space-y-2">
          <Typography size="xs" weight="semibold" color="gray" className="uppercase tracking-wider">
            3. Notion Colors & Highlight Marks
          </Typography>
          <div className="space-y-3 border rounded-md p-4 bg-neutral-50/30">
            <div className="flex flex-wrap gap-4">
              <Typography color="default">Default Text</Typography>
              <Typography color="gray">Gray Text</Typography>
              <Typography color="brown">Brown Text</Typography>
              <Typography color="orange">Orange Text</Typography>
              <Typography color="yellow">Yellow Text</Typography>
              <Typography color="green">Green Text</Typography>
              <Typography color="blue">Blue Text</Typography>
              <Typography color="purple">Purple Text</Typography>
              <Typography color="pink">Pink Text</Typography>
              <Typography color="red">Red Text</Typography>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Typography mark>Default Yellow Highlight Mark</Typography>
              <Typography mark="blue">Blue Pastel Highlight Mark</Typography>
              <Typography mark="green">Green Pastel Highlight Mark</Typography>
              <Typography mark="orange">Orange Pastel Highlight Mark</Typography>
            </div>
          </div>
        </div>

        {/* 4. Modifiers (strong, italic, underline, isDelete, tabular, disabled) */}
        <div className="space-y-2">
          <Typography size="xs" weight="semibold" color="gray" className="uppercase tracking-wider">
            4. Modifiers
          </Typography>
          <div className="flex flex-wrap gap-6 border rounded-md p-4 bg-neutral-50/30">
            <Typography strong>Bold Text (font-semibold)</Typography>
            <Typography italic>Italic Text</Typography>
            <Typography underline>Underlined Text</Typography>
            <Typography isDelete>Strikethrough Text</Typography>
            <Typography tabular>123,456,789.00 (tabular numbers)</Typography>
            <Typography disabled>Disabled Text (opacity-50)</Typography>
          </div>
        </div>

        {/* 5. Interactive Features (copyable, ellipsis) */}
        <div className="space-y-2">
          <Typography size="xs" weight="semibold" color="gray" className="uppercase tracking-wider">
            5. Interactive Features
          </Typography>
          <div className="space-y-3 border rounded-md p-4 bg-neutral-50/30">
            <div>
              <Typography copyable={{ onCopy: onCopySpy, hoverOnly: false }}>
                Copyable String
              </Typography>
            </div>
            <div className="w-80">
              <Typography ellipsis>
                A very long sentence that should be truncated on a single line with ellipsis
              </Typography>
            </div>
            <div className="w-80">
              <Typography ellipsis={{ rows: 2, expandable: true, onExpand: onExpandSpy }}>
                Line 1: Đoạn văn bản mẫu kiểm tra tính năng rút gọn nội dung. Line 2: Dòng thứ hai của đoạn văn bản tiếp tục kéo dài. Line 3: Dòng thứ ba sẽ bị che khuất khi chưa nhấn nút mở rộng. Line 4: Dòng thứ tư hiển thị đầy đủ chi tiết khi đã bấm nút.
              </Typography>
            </div>
            {/* Multi-line Fixed Clamp (3 rows, non-expandable) */}
            <div className="w-80">
              <Typography ellipsis={{ rows: 3 }}>
                Line-clamp 3 dòng cố định không có nút mở rộng. Đoạn văn bản này sẽ hiển thị tối đa đúng ba dòng và luôn luôn bị cắt ngắn bởi CSS line-clamp-3 của Design System bất kể độ dài nội dung.
              </Typography>
            </div>
            {/* Custom Dynamic Symbol ((expanded) => ReactNode) */}
            <div className="w-80">
              <Typography ellipsis={{ rows: 1, expandable: true, symbol: (expanded) => (expanded ? "Rút gọn văn bản" : "Đọc tiếp nội dung") }}>
                Dòng văn bản đầu tiên với nút mở rộng tùy biến nhãn động. Dòng thứ hai xuất hiện khi bấm nút đọc tiếp.
              </Typography>
            </div>
            {/* Custom Static Symbol (string) */}
            <div className="w-80">
              <Typography ellipsis={{ rows: 2, expandable: true, symbol: "Chi tiết" }}>
                Đoạn văn bản có nút xem thêm tĩnh dạng chuỗi Chi tiết. Bấm vào nút này để mở rộng toàn bộ các dòng nội dung bên trong.
              </Typography>
            </div>
            {/* Ellipsis with Suffix */}
            <div className="w-80">
              <Typography ellipsis={{ rows: 1, suffix: " [Hết]" }}>
                Văn bản có hậu tố suffix hiển thị ở cuối dòng khi cắt ngắn
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );

    /* ========================================================================
     * ASSERTIONS KIỂM THỬ TRÊN CÙNG MỘT VIEW
     * ======================================================================== */

    // 1. Kiểm tra Headings & Paragraph
    cy.get("h1")
      .should("exist")
      .and("have.class", "text-3xl")
      .and("have.class", "font-bold")
      .and("contain.text", "Heading 1");

    cy.get("h2")
      .should("exist")
      .and("contain.text", "Heading 2");

    cy.get("h3")
      .should("exist")
      .and("have.class", "text-xl")
      .and("have.class", "font-semibold")
      .and("contain.text", "Heading 3");

    cy.get("h4")
      .should("exist")
      .and("have.class", "text-lg")
      .and("have.class", "font-semibold")
      .and("contain.text", "Heading 4");

    cy.get("h5")
      .should("exist")
      .and("have.class", "text-base")
      .and("have.class", "font-semibold")
      .and("contain.text", "Heading 5");

    cy.get("h6")
      .should("exist")
      .and("have.class", "text-sm")
      .and("have.class", "font-semibold")
      .and("contain.text", "Heading 6");

    cy.get("p")
      .should("exist")
      .and("have.class", "leading-relaxed")
      .and("contain.text", "Paragraph content");

    cy.contains("Text Alias Heading 2").should("exist");
    cy.contains("Default Text rendered as a span tag").should("exist");

    // 2. Kiểm tra Content Blocks
    cy.get("code")
      .should("exist")
      .and("have.class", "ui-inline-code")
      .and("contain.text", "npm install @openway/ui");

    cy.contains("inline code modifier").should("have.class", "ui-inline-code");

    cy.get("blockquote")
      .should("exist")
      .and("have.class", "ui-quote")
      .and("contain.text", "Albert Einstein");

    cy.get("kbd").should("exist").and("have.class", "font-mono").and("contain.text", "Ctrl");

    cy.contains("OpenWay Internal Link")
      .closest("a")
      .should("have.attr", "href", "https://openway.dev")
      .and("have.class", "text-primary-600");

    cy.contains("External Link (target _blank)")
      .closest("a")
      .should("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noopener noreferrer");

    cy.contains("External Link (target _blank)")
      .parent()
      .find("svg")
      .should("exist");

    cy.contains("Important Note")
      .closest(".ui-callout")
      .find("svg")
      .should("exist");

    cy.contains("Warning Note")
      .closest(".ui-callout")
      .should("contain.text", "⚠️")
      .and("have.class", "bg-[#fbecdd]");

    cy.contains("Launch Info")
      .closest(".ui-callout")
      .should("contain.text", "🚀");

    // 3. Kiểm tra Colors & Highlights
    cy.contains("Orange Text").should("have.class", "text-[#d9730d]");
    cy.contains("Blue Text").should("have.class", "text-[#337ea9]");
    cy.contains("Green Text").should("have.class", "text-[#448361]");
    cy.contains("Red Text").should("have.class", "text-[#d44c47]");
    cy.contains("Purple Text").should("have.class", "text-[#9065b0]");
    cy.contains("Default Yellow Highlight Mark").should("have.class", "bg-[#fbf3db]");
    cy.contains("Blue Pastel Highlight Mark").should("have.class", "bg-[#e7f3f8]");

    // 4. Kiểm tra Modifiers
    cy.contains("Bold Text (font-semibold)").should("have.class", "font-semibold");
    cy.contains("Italic Text").should("have.class", "italic");
    cy.contains("Underlined Text").should("have.class", "underline");
    cy.contains("Strikethrough Text").should("have.class", "line-through");
    cy.contains("123,456,789.00 (tabular numbers)").should("have.class", "tabular-nums");
    cy.contains("Disabled Text (opacity-50)")
      .should("have.class", "opacity-50")
      .and("have.class", "cursor-not-allowed");

    // 5. Kiểm tra Tương tác Copy & Expandable
    cy.get("button[aria-label='Sao chép']").should("be.visible").click();
    cy.get("@onCopySpy").should("have.been.calledWith", "Copyable String");
    cy.get("button[aria-label='Đã sao chép!']").should("be.visible");

    cy.contains("A very long sentence").should("have.class", "truncate");

    // Ban đầu bị cắt ở dòng thứ 2 có class line-clamp-2
    cy.contains("Line 1: Đoạn văn bản").should("have.class", "line-clamp-2");

    // Bấm Xem thêm trên button để mở rộng toàn bộ
    cy.contains("button", "Xem thêm").should("be.visible").click();
    cy.get("@onExpandSpy").should("have.been.called");
    cy.contains("button", "Thu gọn").should("be.visible");
    cy.contains("Line 1: Đoạn văn bản").should("not.have.class", "line-clamp-2");

    // Bấm Thu gọn để thu lại như ban đầu
    cy.contains("button", "Thu gọn").click();
    cy.contains("button", "Xem thêm").should("be.visible");
    cy.contains("Line 1: Đoạn văn bản").should("have.class", "line-clamp-2");

    // 5.3 Multi-line Fixed Clamp (3 rows, không có nút mở rộng)
    cy.contains("Line-clamp 3 dòng cố định")
      .should("have.class", "line-clamp-3");
    cy.contains("Line-clamp 3 dòng cố định")
      .parent()
      .find("button")
      .should("not.exist");

    // 5.4 Custom Dynamic Symbol ((expanded) => ReactNode)
    cy.contains("Dòng văn bản đầu tiên với nút mở rộng").should("have.class", "truncate");
    cy.contains("button", "Đọc tiếp nội dung").should("be.visible").click();
    cy.contains("button", "Rút gọn văn bản").should("be.visible").click();
    cy.contains("button", "Đọc tiếp nội dung").should("be.visible");

    // 5.5 Custom Static Symbol (string)
    cy.contains("Đoạn văn bản có nút xem thêm tĩnh").should("have.class", "line-clamp-2");
    cy.contains("button", "Chi tiết").should("be.visible").click();
    cy.contains("button", "Chi tiết").should("be.visible");
    cy.contains("Đoạn văn bản có nút xem thêm tĩnh").should("not.have.class", "line-clamp-2");

    // 5.6 Ellipsis with Suffix
    cy.contains("[Hết]").should("exist");
  });
});
