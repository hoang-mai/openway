import React from "react";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
  EmptyDefaultIcon,
  EmptyErrorIcon,
  EmptyFolderIcon,
  EmptySearchIcon,
  EmptySimpleIcon,
  EyeIcon,
  MinusIcon,
  PlusIcon,
  RadioDotIcon,
  SearchIcon,
  Spinner,
  UploadIcon,
  ImageIcon,
  TrashIcon,
  InfoCircleIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  AvatarIcon,
} from "./index";
import { EyeOffIcon } from "./EyeIcon";

describe("<Icons /> Component & Showcase Tests", () => {
  /* ========================================================================
     1. Unit Tests - Individual Icon Rendering & Attributes
     ======================================================================== */
  describe("Unit Tests - Basic Rendering & Props", () => {
    it("renders basic stroke-based icons with default attributes", () => {
      cy.mount(
        <div className="flex gap-4 p-4">
          <CheckIcon data-testid="check-icon" />
          <CloseIcon data-testid="close-icon" />
          <PlusIcon data-testid="plus-icon" />
          <MinusIcon data-testid="minus-icon" />
          <SearchIcon data-testid="search-icon" />
          <TrashIcon data-testid="trash-icon" />
        </div>
      );

      cy.get('[data-testid="check-icon"]').should("be.visible").and("have.attr", "viewBox", "0 0 24 24");
      cy.get('[data-testid="close-icon"]').should("be.visible").and("have.attr", "viewBox", "0 0 24 24");
      cy.get('[data-testid="plus-icon"]').should("be.visible").and("have.attr", "viewBox", "0 0 24 24");
      cy.get('[data-testid="minus-icon"]').should("be.visible").and("have.attr", "viewBox", "0 0 24 24");
      cy.get('[data-testid="search-icon"]').should("be.visible").and("have.attr", "viewBox", "0 0 24 24");
      cy.get('[data-testid="trash-icon"]').should("be.visible").and("have.attr", "viewBox", "0 0 24 24");
    });

    it("renders navigation and chevron icons", () => {
      cy.mount(
        <div className="flex gap-4 p-4">
          <ChevronDownIcon data-testid="chev-down" />
          <ChevronLeftIcon data-testid="chev-left" />
          <ChevronRightIcon data-testid="chev-right" />
          <DoubleChevronLeftIcon data-testid="d-chev-left" />
          <DoubleChevronRightIcon data-testid="d-chev-right" />
        </div>
      );

      cy.get('[data-testid="chev-down"]').should("be.visible");
      cy.get('[data-testid="chev-left"]').should("be.visible");
      cy.get('[data-testid="chev-right"]').should("be.visible");
      cy.get('[data-testid="d-chev-left"]').should("be.visible");
      cy.get('[data-testid="d-chev-right"]').should("be.visible");
    });

    it("renders status, alert and info icons", () => {
      cy.mount(
        <div className="flex gap-4 p-4">
          <InfoCircleIcon data-testid="info-icon" />
          <CheckCircleIcon data-testid="check-circle-icon" />
          <AlertCircleIcon data-testid="alert-circle-icon" />
          <AlertTriangleIcon data-testid="alert-triangle-icon" />
        </div>
      );

      cy.get('[data-testid="info-icon"]').should("be.visible");
      cy.get('[data-testid="check-circle-icon"]').should("be.visible");
      cy.get('[data-testid="alert-circle-icon"]').should("be.visible");
      cy.get('[data-testid="alert-triangle-icon"]').should("be.visible");
    });

    it("renders media, date & interactive icons (Calendar, Clock, Eye, EyeOff, Upload, Image)", () => {
      cy.mount(
        <div className="flex gap-4 p-4">
          <CalendarIcon data-testid="cal-icon" />
          <ClockIcon data-testid="clock-icon" />
          <EyeIcon data-testid="eye-icon" />
          <EyeOffIcon data-testid="eye-off-icon" />
          <UploadIcon data-testid="upload-icon" />
          <ImageIcon data-testid="img-icon" />
          <AvatarIcon data-testid="avatar-icon" />
        </div>
      );

      cy.get('[data-testid="cal-icon"]').should("be.visible");
      cy.get('[data-testid="clock-icon"]').should("be.visible");
      cy.get('[data-testid="eye-icon"]').should("be.visible");
      cy.get('[data-testid="eye-off-icon"]').should("be.visible");
      cy.get('[data-testid="upload-icon"]').should("be.visible");
      cy.get('[data-testid="img-icon"]').should("be.visible");
      cy.get('[data-testid="avatar-icon"]').should("be.visible");
    });

    it("renders Spinner with animation class", () => {
      cy.mount(<Spinner data-testid="spinner-icon" className="text-primary-500" />);

      cy.get('[data-testid="spinner-icon"]')
        .should("be.visible")
        .and("have.class", "text-primary-500")
        .and("have.class", "animate-[spin_1s_steps(8)_infinite]");
    });

    it("renders RadioDotIcon correctly", () => {
      cy.mount(<RadioDotIcon className="w-4 h-4 text-primary-600" />);

      cy.get("svg")
        .should("be.visible")
        .and("have.attr", "viewBox", "0 0 10 10")
        .and("have.attr", "aria-hidden", "true")
        .and("have.class", "w-4")
        .and("have.class", "h-4")
        .and("have.class", "text-primary-600");
    });

    it("renders all Empty illustration icons", () => {
      cy.mount(
        <div className="flex gap-4 p-4">
          <EmptyDefaultIcon data-testid="empty-default" />
          <EmptyErrorIcon data-testid="empty-error" />
          <EmptyFolderIcon data-testid="empty-folder" />
          <EmptySearchIcon data-testid="empty-search" />
          <EmptySimpleIcon data-testid="empty-simple" />
        </div>
      );

      cy.get('[data-testid="empty-default"]').should("be.visible");
      cy.get('[data-testid="empty-error"]').should("be.visible");
      cy.get('[data-testid="empty-folder"]').should("be.visible");
      cy.get('[data-testid="empty-search"]').should("be.visible");
      cy.get('[data-testid="empty-simple"]').should("be.visible");
    });
  });

  /* ========================================================================
     2. Custom Props, Sizing & Event Handling Tests
     ======================================================================== */
  describe("Custom Props, Sizing & Interactions", () => {
    it("supports custom width and height attributes", () => {
      cy.mount(<SearchIcon width={32} height={32} data-testid="custom-size-search" />);

      cy.get('[data-testid="custom-size-search"]').should("have.attr", "width", "32").and("have.attr", "height", "32");
    });

    it("supports Tailwind size and color classes via className", () => {
      cy.mount(
        <CheckCircleIcon
          className="size-8 text-emerald-500 hover:text-emerald-700 transition-colors"
          data-testid="styled-check-circle"
        />
      );

      cy.get('[data-testid="styled-check-circle"]')
        .should("have.class", "size-8")
        .and("have.class", "text-emerald-500")
        .and("have.class", "hover:text-emerald-700");
    });

    it("supports click event handlers and accessibility attributes", () => {
      const onClickSpy = cy.spy().as("onClickSpy");

      cy.mount(
        <TrashIcon
          role="button"
          aria-label="Delete item"
          tabIndex={0}
          onClick={onClickSpy}
          data-testid="clickable-trash"
          className="cursor-pointer"
        />
      );

      cy.get('[data-testid="clickable-trash"]')
        .should("have.attr", "role", "button")
        .and("have.attr", "aria-label", "Delete item")
        .click();

      cy.get("@onClickSpy").should("have.been.calledOnce");
    });
  });

  /* ========================================================================
     3. Visual Design System Showcase / Icon Gallery
     ======================================================================== */
  describe("🎨 Icons Design System Showcase & Gallery", () => {
    const iconList = [
      { name: "CalendarIcon", component: <CalendarIcon className="size-6" />, category: "General & Media" },
      { name: "ClockIcon", component: <ClockIcon className="size-6" />, category: "General & Media" },
      { name: "EyeIcon", component: <EyeIcon className="size-6" />, category: "General & Media" },
      { name: "EyeOffIcon", component: <EyeOffIcon className="size-6" />, category: "General & Media" },
      { name: "ImageIcon", component: <ImageIcon className="size-6" />, category: "General & Media" },
      { name: "UploadIcon", component: <UploadIcon className="size-6" />, category: "General & Media" },
      { name: "AvatarIcon", component: <AvatarIcon className="size-6" />, category: "General & Media" },
      { name: "CheckIcon", component: <CheckIcon className="size-6" />, category: "Actions & Status" },
      {
        name: "CheckCircleIcon",
        component: <CheckCircleIcon className="size-6 text-emerald-500" />,
        category: "Actions & Status",
      },
      { name: "CloseIcon", component: <CloseIcon className="size-6" />, category: "Actions & Status" },
      { name: "PlusIcon", component: <PlusIcon className="size-6" />, category: "Actions & Status" },
      { name: "MinusIcon", component: <MinusIcon className="size-6" />, category: "Actions & Status" },
      { name: "SearchIcon", component: <SearchIcon className="size-6" />, category: "Actions & Status" },
      { name: "TrashIcon", component: <TrashIcon className="size-6 text-rose-500" />, category: "Actions & Status" },
      { name: "Spinner", component: <Spinner className="size-6 text-primary-500" />, category: "Actions & Status" },
      {
        name: "RadioDotIcon",
        component: <RadioDotIcon className="size-6 text-primary-600" />,
        category: "Actions & Status",
      },
      { name: "ChevronDownIcon", component: <ChevronDownIcon className="size-6" />, category: "Navigation" },
      { name: "ChevronLeftIcon", component: <ChevronLeftIcon className="size-6" />, category: "Navigation" },
      { name: "ChevronRightIcon", component: <ChevronRightIcon className="size-6" />, category: "Navigation" },
      {
        name: "DoubleChevronLeftIcon",
        component: <DoubleChevronLeftIcon className="size-6" />,
        category: "Navigation",
      },
      {
        name: "DoubleChevronRightIcon",
        component: <DoubleChevronRightIcon className="size-6" />,
        category: "Navigation",
      },
      {
        name: "InfoCircleIcon",
        component: <InfoCircleIcon className="size-6 text-sky-500" />,
        category: "Alerts & Feedback",
      },
      {
        name: "AlertCircleIcon",
        component: <AlertCircleIcon className="size-6 text-amber-500" />,
        category: "Alerts & Feedback",
      },
      {
        name: "AlertTriangleIcon",
        component: <AlertTriangleIcon className="size-6 text-rose-500" />,
        category: "Alerts & Feedback",
      },
    ];

    const emptyIllustrations = [
      { name: "EmptyDefaultIcon", component: <EmptyDefaultIcon className="w-20 h-20" /> },
      { name: "EmptySearchIcon", component: <EmptySearchIcon className="w-20 h-20" /> },
      { name: "EmptyErrorIcon", component: <EmptyErrorIcon className="w-20 h-20" /> },
      { name: "EmptyFolderIcon", component: <EmptyFolderIcon className="w-20 h-20" /> },
      { name: "EmptySimpleIcon", component: <EmptySimpleIcon className="w-20 h-20" /> },
    ];

    it("renders complete icon gallery showcase with all 27+ icons and empty illustrations", () => {
      cy.mount(
        <div className="p-8 bg-neutral-50 min-h-screen text-neutral-900 space-y-10 max-w-7xl mx-auto font-sans">
          {/* Header */}
          <div className="border-b border-neutral-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Icons Component Gallery & Design System
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Bộ sưu tập toàn bộ SVG Icons & Empty Illustrations của Design System. Hỗ trợ tùy biến kích thước, màu sắc
              và thuộc tính SVG.
            </p>
          </div>

          {/* Section 1: Standard UI Icons Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                1. Standard UI Icons ({iconList.length} icons)
              </h2>
              <span className="text-xs text-neutral-400">Vector SVG Icons</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {iconList.map((item) => (
                <div
                  key={item.name}
                  className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-xs hover:border-primary-400 hover:shadow-md transition-all group"
                >
                  <div className="text-neutral-700 group-hover:scale-110 transition-transform">
                    {item.component}
                  </div>
                  <div className="text-center w-full">
                    <span className="text-xs font-mono font-medium text-neutral-800 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 block truncate mt-0.5">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Sizes Showcase */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                2. Sizing Variations (12px, 16px, 20px, 24px, 32px, 48px)
              </h2>
              <span className="text-xs text-neutral-400">Props & Tailwind Classes</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs flex flex-wrap items-end gap-8">
              <div className="flex flex-col items-center gap-2">
                <SearchIcon width={12} height={12} className="text-primary-500" />
                <span className="text-[11px] font-mono text-neutral-400">12px (xs)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SearchIcon width={16} height={16} className="text-primary-500" />
                <span className="text-[11px] font-mono text-neutral-400">16px (sm)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SearchIcon width={20} height={20} className="text-primary-500" />
                <span className="text-[11px] font-mono text-neutral-400">20px (md)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SearchIcon width={24} height={24} className="text-primary-500" />
                <span className="text-[11px] font-mono text-neutral-400">24px (lg)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SearchIcon width={32} height={32} className="text-primary-500" />
                <span className="text-[11px] font-mono text-neutral-400">32px (xl)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SearchIcon width={48} height={48} className="text-primary-500" />
                <span className="text-[11px] font-mono text-neutral-400">48px (2xl)</span>
              </div>
            </div>
          </section>

          {/* Section 3: Colors & Semantic Theme States */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                3. Color Palettes & Semantic Statuses
              </h2>
              <span className="text-xs text-neutral-400">currentColor Support</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex flex-col items-center gap-2">
                <CheckCircleIcon className="size-7 text-primary-600" />
                <span className="text-xs font-semibold text-primary-700">Primary</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col items-center gap-2">
                <CheckCircleIcon className="size-7 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Success</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center gap-2">
                <AlertCircleIcon className="size-7 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">Warning</span>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col items-center gap-2">
                <AlertTriangleIcon className="size-7 text-rose-600" />
                <span className="text-xs font-semibold text-rose-700">Error</span>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex flex-col items-center gap-2">
                <InfoCircleIcon className="size-7 text-sky-600" />
                <span className="text-xs font-semibold text-sky-700">Info</span>
              </div>
              <div className="bg-neutral-100 border border-neutral-300 rounded-xl p-4 flex flex-col items-center gap-2">
                <ClockIcon className="size-7 text-neutral-600" />
                <span className="text-xs font-semibold text-neutral-700">Neutral</span>
              </div>
            </div>
          </section>

          {/* Section 4: Empty State Illustrations */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-primary-600">
                4. Empty State Multi-layer Illustrations ({emptyIllustrations.length} styles)
              </h2>
              <span className="text-xs text-neutral-400">SVG Illustrations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {emptyIllustrations.map((item) => (
                <div
                  key={item.name}
                  className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center justify-center p-2">{item.component}</div>
                  <div className="w-full pt-3 border-t border-neutral-100 text-center">
                    <code className="text-xs font-mono text-primary-600">
                      &lt;{item.name} /&gt;
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );

      // Assertions
      cy.contains("Icons Component Gallery & Design System").should("be.visible");
      cy.contains("1. Standard UI Icons").should("be.visible");
      cy.contains("2. Sizing Variations").should("be.visible");
      cy.contains("3. Color Palettes & Semantic Statuses").should("be.visible");
      cy.contains("4. Empty State Multi-layer Illustrations").should("be.visible");
      cy.get("svg").should("have.length.greaterThan", 30);
    });
  });
});
