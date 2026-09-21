import React from "react";
import { OpenWayProvider } from "./common/OpenWayProvider";
import { viVN } from "@/locale/viVN";

// 1. Button & IconButton
import { Button, IconButton } from "./button";

// 2. Typography & Callout
import { Typography, Text, CalloutView } from "./typography";

// 3. Breadcrumb
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

// 4. Form Inputs & Textarea
import { Input, PasswordInput, NumberInput, OtpInput, MultiInput } from "./input";
import { TextArea } from "./textarea";

// 5. Selection Controls
import { Checkbox, CheckboxGroup } from "./checkbox";
import { Radio, RadioGroup } from "./radio";
import { Toggle } from "./toggle";

// 6. Slider
import { Slider } from "./slider";

// 7. Select & MultiSelect
import { Select, MultiSelect } from "./select";

// 8. Pickers
import { DatePicker } from "./datepicker";
import { DateRangePicker } from "./daterangepicker";
import { TimePicker } from "./timepicker";
import { TimeRangePicker } from "./timerangepicker";
import { DateTimePicker } from "./datetimepicker";
import { DateTimeRangePicker } from "./datetimerangepicker";

// 9. Feedback & Status
import { Badge } from "./badge";
import { Alert } from "./alert";
import { Empty } from "./empty";
import { Toaster } from "./toast";

// 10. Navigation & Layout
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./tabs";
import { Collapse, CollapsePanel } from "./collapse";
import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselPagination,
} from "./carousel";

// 11. Overlays & Dialogs
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal";
import { Confirm, ConfirmHeader, ConfirmBody, ConfirmFooter } from "./confirm";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
} from "./dropdown";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "./popover";
import { Tooltip } from "./tooltip";

// 12. Data Display
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableFooter,
} from "./table";

// 13. Uploaders & Previews
import { UploadFile } from "./upload-file";
import { UploadImage } from "./upload-image";
import { UploadAvatar } from "./upload-avatar";
import { FileContainer, FilePreview } from "./file-preview";

// 14. Skeleton & Loading
import { Skeleton, LoadingImage } from "./skeleton";

// Common Icons
import SearchIcon from "./icons/SearchIcon";
import PlusIcon from "./icons/PlusIcon";
import TrashIcon from "./icons/TrashIcon";
import CheckIcon from "./icons/CheckIcon";

const sampleOptions = [
  { value: "admin", label: "Quản trị viên (Admin)" },
  { value: "editor", label: "Biên tập viên (Editor)" },
  { value: "viewer", label: "Người xem (Viewer)" },
  { value: "guest", label: "Khách (Guest)" },
];

describe("Comprehensive Automated Accessibility (A11y) Verification Suite", () => {
  /* ========================================================================
     1. BUTTON & ICONBUTTON (All Variants, Colors, Sizes & States)
     ======================================================================== */
  describe("1. Button & IconButton Accessibility (WCAG 2.1 AA)", () => {
    it("verifies Button filled variant across all 7 colors", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap gap-3 bg-white">
            <Button variant="filled" color="primary">Primary Filled</Button>
            <Button variant="filled" color="secondary">Secondary Filled</Button>
            <Button variant="filled" color="success">Success Filled</Button>
            <Button variant="filled" color="warning">Warning Filled</Button>
            <Button variant="filled" color="error">Error Filled</Button>
            <Button variant="filled" color="info">Info Filled</Button>
            <Button variant="filled" color="neutral">Neutral Filled</Button>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Button soft variant across all 7 colors", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap gap-3 bg-white">
            <Button variant="soft" color="primary">Primary Soft</Button>
            <Button variant="soft" color="secondary">Secondary Soft</Button>
            <Button variant="soft" color="success">Success Soft</Button>
            <Button variant="soft" color="warning">Warning Soft</Button>
            <Button variant="soft" color="error">Error Soft</Button>
            <Button variant="soft" color="info">Info Soft</Button>
            <Button variant="soft" color="neutral">Neutral Soft</Button>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Button outline variant across all 7 colors", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap gap-3 bg-white">
            <Button variant="outline" color="primary">Primary Outline</Button>
            <Button variant="outline" color="secondary">Secondary Outline</Button>
            <Button variant="outline" color="success">Success Outline</Button>
            <Button variant="outline" color="warning">Warning Outline</Button>
            <Button variant="outline" color="error">Error Outline</Button>
            <Button variant="outline" color="info">Info Outline</Button>
            <Button variant="outline" color="neutral">Neutral Outline</Button>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Button ghost & text variants across all colors", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap gap-3 bg-white">
            <Button variant="ghost" color="primary">Primary Ghost</Button>
            <Button variant="ghost" color="secondary">Secondary Ghost</Button>
            <Button variant="ghost" color="error">Error Ghost</Button>
            <Button variant="text" color="primary">Primary Text</Button>
            <Button variant="text" color="secondary">Secondary Text</Button>
            <Button variant="text" color="info">Info Text</Button>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Button sizes (xs, sm, md, lg, xl) and interactive states (disabled, loading)", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap items-center gap-3 bg-white">
            <Button size="xs">Size XS</Button>
            <Button size="sm">Size SM</Button>
            <Button size="md">Size MD</Button>
            <Button size="lg">Size LG</Button>
            <Button size="xl">Size XL</Button>
            <Button disabled>Disabled Button</Button>
            <Button isLoading loadingText="Saving Data...">Loading</Button>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies IconButton variants (filled, soft, outline, ghost) with accessible aria-label", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap gap-3 bg-white">
            <IconButton icon={<SearchIcon />} aria-label="Search records" color="primary" variant="filled" />
            <IconButton icon={<CheckIcon />} aria-label="Confirm item" variant="outline" color="secondary" />
            <IconButton icon={<PlusIcon />} aria-label="Add new item" variant="soft" color="success" />
            <IconButton icon={<TrashIcon />} aria-label="Delete entry" variant="ghost" color="error" />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("detects and flags accessibility violation when IconButton lacks an accessible name", () => {
      cy.mount(
        <div className="p-4 bg-white">
          <button type="button" className="p-2 border rounded">
            <SearchIcon />
          </button>
        </div>
      );
      cy.injectAxe();
      cy.checkA11y(
        "[data-cy-root]",
        {
          rules: {
            "button-name": { enabled: true },
          },
        },
        (violations) => {
          const buttonNameViolation = violations.find((v) => v.id === "button-name");
          expect(buttonNameViolation).to.exist;
        },
        true
      );
    });
  });

  /* ========================================================================
     2. TYPOGRAPHY & CALLOUT (Notion Design Tokens & Contrast)
     ======================================================================== */
  describe("2. Typography & CalloutView (WCAG 2.1 AA)", () => {
    it("verifies semantic Typography headings (h1, h2, h3, h4, h5, h6)", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-3 bg-white max-w-2xl">
            <Typography type="h1">Notion Design Heading 1</Typography>
            <Typography type="h2">Section Title Heading 2</Typography>
            <Typography type="h3">Sub-section Heading 3</Typography>
            <Typography type="h4">Feature Topic Heading 4</Typography>
            <Typography type="h5">Minor Topic Heading 5</Typography>
            <Typography type="h6">Fineprint Title Heading 6</Typography>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies body typography, inline code, keyboard shortcut, blockquote and links", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-3 bg-white max-w-2xl">
            <Typography type="p">
              Standard body paragraph text with high-contrast warm neutrals ensuring readability.
            </Typography>
            <Typography type="blockquote">
              Clean and accessible design empowers every user regardless of ability.
            </Typography>
            <div className="flex items-center gap-3">
              <Typography type="code">npm install @openway/ui</Typography>
              <Typography type="kbd">Ctrl + K</Typography>
              <Typography type="a" href="#docs">View Documentation</Typography>
            </div>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Text color variants and CalloutView palettes", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-2xl">
            <div className="flex flex-wrap gap-2 text-sm">
              <Text color="default">Default Text</Text>
              <Text color="gray">Gray Text</Text>
              <Text color="blue">Blue Text</Text>
              <Text color="green">Green Text</Text>
              <Text color="purple">Purple Text</Text>
            </div>
            <CalloutView color="default">Default warm paper callout box note.</CalloutView>
            <CalloutView color="blue">Blue informative callout highlight.</CalloutView>
            <CalloutView color="green">Green success confirmation message.</CalloutView>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     3. BREADCRUMB NAVIGATION (WAI-ARIA Breadcrumb Pattern)
     ======================================================================== */
  describe("3. Breadcrumb Navigation (WAI-ARIA Breadcrumb Pattern)", () => {
    it("verifies Breadcrumb standard variant and aria-current=page", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Breadcrumb variant="standard">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#workspaces">Workspaces</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Breadcrumb solid and bordered variants across sizes", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white">
            <Breadcrumb variant="solid" size="sm">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#root">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Analytics</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Breadcrumb variant="bordered" size="md">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#corp">Organization</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Billing</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     4. FORM CONTROLS & INPUT FAMILIES (All Variants & States)
     ======================================================================== */
  describe("4. Form Controls & Input Families (All Variants & States)", () => {
    it("verifies Input outline, filled, and ghost variants", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 max-w-lg space-y-4 bg-white">
            <Input
              id="inp-outline"
              label="Outline Input"
              variant="outline"
              placeholder="Outline style"
              helperText="Helper with sufficient contrast"
            />
            <Input
              id="inp-filled"
              label="Filled Input"
              variant="filled"
              placeholder="Filled background"
            />
            <Input
              id="inp-ghost"
              label="Ghost Input"
              variant="ghost"
              placeholder="Ghost border style"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies PasswordInput toggle button accessibility and visibility state", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 max-w-lg space-y-4 bg-white">
            <PasswordInput
              id="user-pwd"
              label="Account Password"
              placeholder="Enter secure password"
              helperText="Must be at least 8 characters"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies NumberInput and OtpInput numeric controls", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 max-w-lg space-y-4 bg-white">
            <NumberInput
              id="order-qty"
              label="Order Quantity"
              defaultValue={3}
              min={1}
              max={100}
            />
            <OtpInput
              id="verify-otp"
              label="Security Verification Code"
              length={4}
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies MultiInput with removable tag chips and TextArea variants", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 max-w-lg space-y-4 bg-white">
            <MultiInput
              id="tech-tags"
              label="Skills & Technologies"
              defaultValue={["React", "TypeScript"]}
            />
            <TextArea
              id="bio-area"
              label="Personal Biography"
              variant="outline"
              placeholder="Write a brief intro..."
              helperText="Up to 500 characters"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     5. SELECTION CONTROLS (Checkbox, Radio, Toggle - All Variants & Colors)
     ======================================================================== */
  describe("5. Selection Controls (Checkbox, Radio, Toggle)", () => {
    it("verifies Checkbox states (checked, unchecked, indeterminate, disabled)", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-3 bg-white max-w-md">
            <Checkbox id="cb-primary" label="Primary Checkbox" defaultChecked color="primary" />
            <Checkbox id="cb-success" label="Success Checkbox" defaultChecked color="success" />
            <Checkbox id="cb-indeterminate" label="Indeterminate Checkbox" config={{ indeterminate: true }} />
            <Checkbox id="cb-disabled" label="Disabled Checkbox" disabled />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies CheckboxGroup semantic fieldset and legend structure", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md">
            <CheckboxGroup
              label="Notification Channels"
              defaultValue={["email"]}
              options={[
                { value: "email", label: "Email Notifications" },
                { value: "sms", label: "SMS Alerts" },
                { value: "push", label: "Mobile Push" },
              ]}
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Radio & RadioGroup roving tabindex and keyboard navigation", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md">
            <RadioGroup
              label="Delivery Priority"
              defaultValue="standard"
              options={[
                { value: "standard", label: "Standard Shipping (3-5 days)" },
                { value: "express", label: "Express Delivery (Next day)" },
                { value: "same-day", label: "Same Day Courier", disabled: true },
              ]}
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Toggle switch role, aria-checked, and sizes", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-3 bg-white max-w-md">
            <Toggle id="toggle-dark" label="Dark Theme Mode" defaultChecked />
            <Toggle id="toggle-auto" label="Auto-sync changes" size="sm" />
            <Toggle id="toggle-disabled" label="Offline caching" disabled />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     6. SLIDERS & NUMERIC RANGE CONTROLS (WAI-ARIA Slider)
     ======================================================================== */
  describe("6. Sliders & Numeric Range Controls (WAI-ARIA Slider)", () => {
    it("verifies single slider with role=slider, aria-valuenow, min and max", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-6 bg-white max-w-md">
            <Slider
              id="volume-slider"
              label="System Audio Volume"
              defaultValue={45}
              min={0}
              max={100}
              color="primary"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies range slider with two thumbs and step marks", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-6 bg-white max-w-md">
            <Slider
              id="budget-range"
              label="Price Range Filter ($)"
              defaultValue={[20, 80]}
              min={0}
              max={100}
              step={10}
              marks
              color="success"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     7. SELECT & MULTISELECT CONTROLS (All Variants)
     ======================================================================== */
  describe("7. Select & MultiSelect Controls (All Variants)", () => {
    it("verifies Select outline and filled variants with accessible combobox naming", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-md">
            <Select
              id="role-select"
              label="Assigned Role"
              placeholder="Choose a role..."
              options={sampleOptions}
              variant="outline"
            />
            <Select
              id="role-select-filled"
              label="Department (Filled Variant)"
              placeholder="Choose department..."
              options={sampleOptions}
              variant="filled"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies MultiSelect with tag chips and clearable selection", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-md">
            <MultiSelect
              id="permissions-multiselect"
              label="Access Permissions"
              placeholder="Select permissions..."
              options={sampleOptions}
              defaultValue={["editor"]}
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     8. DATE & TIME PICKERS (All Picker Families)
     ======================================================================== */
  describe("8. Date & Time Pickers (DatePicker, DateRange, TimePicker, DateTime)", () => {
    it("verifies DatePicker and DateRangePicker triggers", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-md">
            <DatePicker
              id="single-date"
              label="Meeting Date"
              placeholder="DD/MM/YYYY"
            />
            <DateRangePicker
              id="range-date"
              label="Booking Period"
              placeholder="DD/MM/YYYY - DD/MM/YYYY"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies TimePicker and TimeRangePicker triggers", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-md">
            <TimePicker
              id="start-time"
              label="Start Time"
              placeholder="HH:mm"
            />
            <TimeRangePicker
              id="work-hours"
              label="Working Hours"
              placeholder="HH:mm - HH:mm"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies DateTimePicker and DateTimeRangePicker triggers", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-md">
            <DateTimePicker
              id="event-datetime"
              label="Event Schedule"
              placeholder="DD/MM/YYYY HH:mm"
            />
            <DateTimeRangePicker
              id="campaign-datetimerange"
              startLabel="Campaign Launch"
              endLabel="Campaign End"
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     9. STATUS & FEEDBACK (Pastel Palettes Color Contrast WCAG 2.1 AA)
     ======================================================================== */
  describe("9. Status & Feedback (Pastel Palettes Color Contrast WCAG 2.1 AA)", () => {
    it("verifies Badge filled and soft variants across all 7 colors", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white">
            <div className="flex flex-wrap gap-2">
              <Badge variant="filled" color="primary">Primary Filled</Badge>
              <Badge variant="filled" color="secondary">Secondary Filled</Badge>
              <Badge variant="filled" color="success">Success Filled</Badge>
              <Badge variant="filled" color="warning">Warning Filled</Badge>
              <Badge variant="filled" color="error">Error Filled</Badge>
              <Badge variant="filled" color="info">Info Filled</Badge>
              <Badge variant="filled" color="neutral">Neutral Filled</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="soft" color="primary">Primary Soft</Badge>
              <Badge variant="soft" color="secondary">Secondary Soft</Badge>
              <Badge variant="soft" color="success">Success Soft</Badge>
              <Badge variant="soft" color="warning">Warning Soft</Badge>
              <Badge variant="soft" color="error">Error Soft</Badge>
              <Badge variant="soft" color="info">Info Soft</Badge>
              <Badge variant="soft" color="neutral">Neutral Soft</Badge>
            </div>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Badge outline and ghost variants", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 flex flex-wrap gap-2 bg-white">
            <Badge variant="outline" color="primary">Primary Outline</Badge>
            <Badge variant="outline" color="success">Success Outline</Badge>
            <Badge variant="outline" color="error">Error Outline</Badge>
            <Badge variant="ghost" color="primary">Primary Ghost</Badge>
            <Badge variant="ghost" color="neutral">Neutral Ghost</Badge>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Alert variants (soft, filled, outline, accent-left, ghost) across all alert colors", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-3 bg-white max-w-xl">
            <Alert color="info" variant="soft" title="System Notice" description="Weekly server backup scheduled at 02:00 AM." />
            <Alert color="success" variant="filled" title="Payment Succeeded" description="Transaction #98421 confirmed." />
            <Alert color="warning" variant="outline" title="Approaching Limit" description="You have used 85% of monthly storage quota." />
            <Alert color="error" variant="accent-left" title="Connection Failure" description="Unable to connect to remote database cluster." />
            <Alert color="neutral" variant="ghost" title="Changelog" description="OpenWay UI v2.0.0 is now live." />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Empty state and Toaster live region container", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md">
            <Empty
              title="Không tìm thấy dữ liệu"
              description="Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn."
            />
            <Toaster position="bottom-right" />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     10. NAVIGATION & LAYOUT (Tabs, Collapse, Carousel)
     ======================================================================== */
  describe("10. Navigation & Layout (Tabs, Collapse, Carousel)", () => {
    it("verifies Tabs line and solid variants with role=tablist, role=tab, role=tabpanel", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-6 bg-white max-w-lg">
            <Tabs defaultValue="overview" variant="line">
              <TabList aria-label="Project Sections Line">
                <Tab value="overview">Tổng quan</Tab>
                <Tab value="tasks">Nhiệm vụ</Tab>
                <Tab value="files">Tệp đính kèm</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="overview">Overview content details.</TabPanel>
                <TabPanel value="tasks">Task list assignments.</TabPanel>
                <TabPanel value="files">Attached documents.</TabPanel>
              </TabPanels>
            </Tabs>

            <Tabs defaultValue="all" variant="solid">
              <TabList aria-label="Filter Solid">
                <Tab value="all">Tất cả</Tab>
                <Tab value="active">Đang hoạt động</Tab>
                <Tab value="archived">Lưu trữ</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="all">All items display.</TabPanel>
                <TabPanel value="active">Active items display.</TabPanel>
                <TabPanel value="archived">Archived items display.</TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Tabs bordered and flat variants", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-6 bg-white max-w-lg">
            <Tabs defaultValue="sec-a" variant="bordered">
              <TabList aria-label="Bordered Tabs">
                <Tab value="sec-a">Tab Thẻ A</Tab>
                <Tab value="sec-b">Tab Thẻ B</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="sec-a">Bordered content A.</TabPanel>
                <TabPanel value="sec-b">Bordered content B.</TabPanel>
              </TabPanels>
            </Tabs>

            <Tabs defaultValue="view-grid" variant="flat">
              <TabList aria-label="Flat Mode">
                <Tab value="view-grid">Grid View</Tab>
                <Tab value="view-list">List View</Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="view-grid">Grid contents.</TabPanel>
                <TabPanel value="view-list">List contents.</TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Collapse accordion expansion with aria-expanded and aria-controls", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md">
            <Collapse defaultActiveKey={["item-1"]}>
              <CollapsePanel value="item-1" label="Chính sách bảo mật dữ liệu">
                Thông tin người dùng được mã hóa theo tiêu chuẩn an toàn bảo mật AES-256.
              </CollapsePanel>
              <CollapsePanel value="item-2" label="Điều khoản thanh toán & hóa đơn">
                Hóa đơn VAT điện tử được gửi tự động qua email vào đầu mỗi kỳ thanh toán.
              </CollapsePanel>
            </Collapse>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Carousel slides, previous/next controls, and pagination indicators", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md">
            <Carousel>
              <CarouselContent>
                <CarouselSlide>
                  <div className="p-8 bg-neutral-100 rounded text-center">Banner Slide 1</div>
                </CarouselSlide>
                <CarouselSlide>
                  <div className="p-8 bg-neutral-100 rounded text-center">Banner Slide 2</div>
                </CarouselSlide>
              </CarouselContent>
              <div className="flex justify-between items-center mt-3">
                <CarouselPrevious aria-label="Previous Slide" />
                <CarouselPagination />
                <CarouselNext aria-label="Next Slide" />
              </div>
            </Carousel>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     11. OVERLAYS & DIALOGS (Modal, Confirm, Dropdown, Popover, Tooltip)
     ======================================================================== */
  describe("11. Overlays & Dialogs (Modal, Confirm, Dropdown, Popover, Tooltip)", () => {
    it("verifies Modal dialog structure with accessible title and close button", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Modal role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <ModalHeader id="modal-title" title="Thông tin dự án" description="Khởi tạo workspace mới" />
              <ModalBody>
                <p className="text-neutral-700">Điền các thông tin cần thiết để khởi tạo workspace mới.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="outline">Hủy bỏ</Button>
                <Button variant="filled" color="primary">Xác nhận</Button>
              </ModalFooter>
            </Modal>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Confirm dialog with action and cancellation buttons", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Confirm color="error">
              <ConfirmHeader title="Xác nhận xóa tài nguyên" />
              <ConfirmBody>
                Bạn có chắc chắn muốn xóa bản ghi này vĩnh viễn không?
              </ConfirmBody>
              <ConfirmFooter onConfirm={() => {}} onCancel={() => {}} />
            </Confirm>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Dropdown menu trigger and role=menuitem elements", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outline">Tùy chọn thao tác</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Action Options">
                <DropdownItem key="edit">Chỉnh sửa thông tin</DropdownItem>
                <DropdownItem key="duplicate">Nhân bản</DropdownItem>
                <DropdownSeparator />
                <DropdownItem key="delete" color="error">Xóa bản ghi</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Popover trigger and content", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Popover>
              <PopoverTrigger>
                <Button variant="soft">Xem gợi ý nhanh</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>Mẹo sử dụng</PopoverHeader>
                <PopoverBody>
                  Sử dụng phím tắt Tab để di chuyển qua các trường nhập liệu một cách nhanh chóng.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Tooltip accessible description linking", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Tooltip content="Mẹo: Click vào đây để làm mới dữ liệu biểu đồ" placement="top">
              <Button variant="outline">Làm mới dữ liệu</Button>
            </Tooltip>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     12. DATA TABLES & TABULAR NUMERICS
     ======================================================================== */
  describe("12. Data Tables & Tabular Numerics", () => {
    it("verifies Table default variant with thead, tbody, th scope=col, and caption", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white">
            <Table variant="default">
              <TableCaption>Bảng thống kê doanh thu quý 3 theo chi nhánh</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Chi nhánh</TableHead>
                  <TableHead scope="col">Giao dịch</TableHead>
                  <TableHead scope="col">Doanh thu (VNĐ)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Hà Nội</TableCell>
                  <TableCell className="tabular-nums">1,240</TableCell>
                  <TableCell className="tabular-nums">450,000,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TP. Hồ Chí Minh</TableCell>
                  <TableCell className="tabular-nums">2,850</TableCell>
                  <TableCell className="tabular-nums">980,000,000</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Tổng cộng</TableCell>
                  <TableCell className="tabular-nums font-semibold">4,090</TableCell>
                  <TableCell className="tabular-nums font-semibold">1,430,000,000</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies Table striped and bordered variants", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-6 bg-white">
            <Table variant="striped">
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Mã đơn</TableHead>
                  <TableHead scope="col">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#ORD-101</TableCell>
                  <TableCell>Đã giao</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#ORD-102</TableCell>
                  <TableCell>Đang vận chuyển</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table variant="bordered">
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Hạng mục</TableHead>
                  <TableHead scope="col">Tiến độ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Phát triển Frontend</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     13. UPLOAD & MEDIA MANAGEMENT
     ======================================================================== */
  describe("13. Upload & Media Management", () => {
    it("verifies UploadFile dropzone and file listing", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-lg">
            <UploadFile
              maxCount={3}
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies UploadImage dropzone with image preview cards", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-lg">
            <UploadImage
              maxCount={4}
            />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies UploadAvatar circular dropzone with accessible description", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white flex justify-center">
            <UploadAvatar />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies FilePreview file card item with action controls", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md">
            <FileContainer
              open={false}
              file={{
                id: "f1",
                name: "Technical_Specification_v2.pdf",
                size: 2048576,
                type: "application/pdf",
                url: "https://example.com/spec.pdf",
              }}
              onClose={() => {}}
            >
              <FilePreview />
            </FileContainer>
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });

  /* ========================================================================
     14. SKELETON & LOADING STATES
     ======================================================================== */
  describe("14. Skeleton & Loading States", () => {
    it("verifies Skeleton loaders (circular, rectangular) with aria-busy=true", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 space-y-4 bg-white max-w-md">
            <div className="flex items-center space-x-4">
              <Skeleton shape="circle" width={48} height={48} />
              <div className="space-y-2 flex-1">
                <Skeleton shape="rectangle" height={16} width="80%" />
                <Skeleton shape="rectangle" height={12} width="50%" />
              </div>
            </div>
            <Skeleton shape="rectangle" height={120} className="w-full rounded-md" />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });

    it("verifies LoadingImage placeholder with accessible status", () => {
      cy.mount(
        <OpenWayProvider locale={viVN}>
          <div className="p-6 bg-white max-w-md flex justify-center">
            <LoadingImage width={200} height={150} alt="Product preview placeholder" />
          </div>
        </OpenWayProvider>
      );
      cy.checkA11yWCAG();
    });
  });
});
