import React from "react";
import { Empty } from "./index";
import { Button } from "../button";
import { EmptyDefaultIcon, EmptySearchIcon, EmptyErrorIcon, EmptyFolderIcon, EmptySimpleIcon } from "../icons";

describe("<Empty /> - All Variants & States Showcase", () => {
  it("mounts all variants, presets, sizes, layouts, and custom states in a single mount", () => {
    cy.mount(
      <div className="p-8 bg-neutral-50 dark:bg-neutral-950 min-h-screen text-neutral-900 dark:text-neutral-100 space-y-10 max-w-7xl mx-auto font-sans">
        {/* Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Empty Component - All Variants Showcase
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Trưng bày trực quan toàn bộ các presets, kích cỡ (sizes), bố cục (layouts), custom illustrations và actions
            trong cùng 1 màn hình.
          </p>
        </div>

        {/* 1. All Built-in Presets */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400">
              1. Preset Illustrations (image="default" | "search" | "error" | "folder" | "simple")
            </h2>
            <span className="text-xs text-neutral-400">5 built-in SVG styles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Default */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-primary-300 transition-colors">
              <Empty size="sm" image="default" title="Default (No Data)" description="Không có dữ liệu hiển thị." />
              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <code className="text-[11px] font-mono text-primary-600 dark:text-primary-400">image="default"</code>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-primary-300 transition-colors">
              <Empty size="sm" image="search" title="Search Not Found" description="Không tìm thấy kết quả phù hợp." />
              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <code className="text-[11px] font-mono text-primary-600 dark:text-primary-400">image="search"</code>
              </div>
            </div>

            {/* Error */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-error-300 transition-colors">
              <Empty size="sm" image="error" title="Load Failed" description="Không thể kết nối đến máy chủ." />
              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <code className="text-[11px] font-mono text-error-600 dark:text-error-400">image="error"</code>
              </div>
            </div>

            {/* Folder */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-primary-300 transition-colors">
              <Empty size="sm" image="folder" title="Empty Folder" description="Thư mục hiện đang trống." />
              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <code className="text-[11px] font-mono text-primary-600 dark:text-primary-400">image="folder"</code>
              </div>
            </div>

            {/* Simple */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-neutral-400 transition-colors">
              <Empty size="sm" image="simple" title="Simple Minimal" description="Minh họa tối giản gọn nhẹ." />
              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <code className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">image="simple"</code>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sizes (sm, md, lg) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400">
              2. Sizes (size="sm" | "md" | "lg")
            </h2>
            <span className="text-xs text-neutral-400">Small, Medium, Large</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Size SM */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-neutral-400 block mb-1">SIZE="SM"</span>
                <p className="text-xs text-neutral-500 mb-4">Dành cho Dropdown, Popover, Select, bảng nhỏ</p>
                <Empty
                  size="sm"
                  image="default"
                  title="Không có thông báo"
                  description="Bạn đã đọc hết tất cả thông báo mới."
                  actions={
                    <Button size="xs" variant="filled" color="primary">
                      Làm mới
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Size MD */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-primary-500 block mb-1">SIZE="MD" (Mặc định)</span>
                <p className="text-xs text-neutral-500 mb-4">Dành cho Card, Modal, Section dữ liệu tiêu chuẩn</p>
                <Empty
                  size="md"
                  image="default"
                  title="Chưa có dự án nào"
                  description="Bắt đầu tạo dự án đầu tiên của bạn để theo dõi tiến độ công việc."
                  actions={
                    <Button size="sm" variant="filled" color="primary">
                      + Tạo dự án mới
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Size LG */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-neutral-400 block mb-1">SIZE="LG"</span>
                <p className="text-xs text-neutral-500 mb-4">Dành cho toàn trang (Full-page Empty State), Dashboard</p>
                <Empty
                  size="lg"
                  image="default"
                  title="Chào mừng bạn đến với Không gian làm việc!"
                  description="Hiện tại chưa có dữ liệu báo cáo nào trong kỳ này."
                  actions={
                    <div className="flex gap-2">
                      <Button size="md" variant="outline" color="secondary">
                        Xem hướng dẫn
                      </Button>
                      <Button size="md" variant="filled" color="primary">
                        Bắt đầu ngay
                      </Button>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Layouts (Vertical vs Horizontal) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400">
              3. Layouts (layout="vertical" | "horizontal")
            </h2>
            <span className="text-xs text-neutral-400">Bố cục dọc và ngang</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vertical Layout */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs">
              <span className="text-xs font-mono font-bold text-neutral-400 block mb-3">
                LAYOUT="VERTICAL" (Mặc định)
              </span>
              <Empty
                layout="vertical"
                image="search"
                title="Không tìm thấy sản phẩm"
                description="Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc giá."
                actions={
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" color="secondary">
                      Xóa bộ lọc
                    </Button>
                    <Button size="sm" variant="filled" color="primary">
                      Tìm lại
                    </Button>
                  </div>
                }
              />
            </div>

            {/* Horizontal Layout */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs flex flex-col justify-center">
              <span className="text-xs font-mono font-bold text-neutral-400 block mb-3">
                LAYOUT="HORIZONTAL" (Ảnh bên trái, Nội dung bên phải)
              </span>
              <Empty
                layout="horizontal"
                image="error"
                imageSize={100}
                title="Mất kết nối máy chủ"
                description="Không thể đồng bộ dữ liệu với máy chủ. Vui lòng kiểm tra lại đường truyền internet và thử lại."
                actions={
                  <Button size="sm" variant="filled" color="error">
                    Thử kết nối lại
                  </Button>
                }
              />
            </div>
          </div>
        </section>

        {/* 4. Custom Image Options (URL, ReactNode Icon, Folder, Custom Size) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400">
              4. Custom Images & Custom Content
            </h2>
            <span className="text-xs text-neutral-400">URL, Custom ReactNode, Custom Size</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Custom URL Image */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <Empty
                size="sm"
                image="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=160&auto=format&fit=crop&q=60"
                imageClassName="rounded-xl overflow-hidden shadow-xs"
                imageAlt="Art Gallery"
                title="Bộ sưu tập ảnh trống"
                description="Tải lên ảnh của bạn."
              />
              <div className="mt-2 text-center">
                <code className="text-[10px] font-mono text-neutral-500">image="https://..."</code>
              </div>
            </div>

            {/* Custom ReactNode Emoji / Icon */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <Empty
                size="sm"
                image={
                  <div className="w-14 h-14 rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-3xl">
                    🚀
                  </div>
                }
                title="Sẵn sàng cất cánh"
                description="Tạo dự án mới để bắt đầu."
              />
              <div className="mt-2 text-center">
                <code className="text-[10px] font-mono text-neutral-500">image=&lt;CustomNode /&gt;</code>
              </div>
            </div>

            {/* Custom imageSize */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <Empty
                size="sm"
                image="folder"
                imageSize={48}
                title="Folder (48px)"
                description="Tùy chỉnh imageSize={48}."
              />
              <div className="mt-2 text-center">
                <code className="text-[10px] font-mono text-neutral-500">imageSize=&#123;48&#125;</code>
              </div>
            </div>

            {/* Direct Icon Component */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <Empty
                size="sm"
                image={<EmptySimpleIcon className="w-12 h-12" />}
                title="EmptySimpleIcon"
                description="Nhúng trực tiếp từ folder icons."
              />
              <div className="mt-2 text-center">
                <code className="text-[10px] font-mono text-neutral-500">&lt;EmptySimpleIcon /&gt;</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    );

    // Assertions without data-testid
    cy.contains("Empty Component - All Variants Showcase").should("be.visible");
    cy.contains("Default (No Data)").should("be.visible");
    cy.contains("Search Not Found").should("be.visible");
    cy.contains("Load Failed").should("be.visible");
    cy.contains("Empty Folder").should("be.visible");
    cy.contains("Simple Minimal").should("be.visible");
    cy.contains("Không có thông báo").should("be.visible");
    cy.contains("Chưa có dự án nào").should("be.visible");
    cy.contains("Chào mừng bạn đến với Không gian làm việc!").should("be.visible");
    cy.contains("Không tìm thấy sản phẩm").should("be.visible");
    cy.contains("Mất kết nối máy chủ").should("be.visible");
  });

  it("safely falls back when invalid size or layout is provided (getSafeConfig)", () => {
    cy.mount(
      <Empty
        // @ts-expect-error Testing runtime fallback for invalid size
        size={"invalid-size"}
        // @ts-expect-error Testing runtime fallback for invalid layout
        layout={"invalid-layout"}
        title="Safe Fallback Title"
        description="Safe Fallback Description"
      />
    );
    cy.contains("Safe Fallback Title").should("be.visible");
    cy.contains("Safe Fallback Description").should("be.visible");
  });
});
