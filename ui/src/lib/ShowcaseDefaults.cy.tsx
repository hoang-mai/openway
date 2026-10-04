import React, { useState } from "react";
import { Button, IconButton } from "./button";
import { Badge } from "./badge";
import { Input, PasswordInput, NumberInput, OtpInput, MultiInput } from "./input";
import { TextArea } from "./textarea";
import { Checkbox, CheckboxGroup } from "./checkbox";
import { Radio, RadioGroup } from "./radio";
import { Toggle } from "./toggle";
import { Slider } from "./slider";
import { Select, MultiSelect } from "./select";
import { DatePicker, Calendar } from "./datepicker";
import { DateRangePicker } from "./daterangepicker";
import { TimePicker, TimeView } from "./timepicker";
import { TimeRangePicker } from "./timerangepicker";
import { DateTimePicker } from "./datetimepicker";
import { DateTimeRangePicker } from "./datetimerangepicker";
import { Alert } from "./alert";
import { Empty } from "./empty";
import { Skeleton } from "./skeleton";
import { Tooltip } from "./tooltip";
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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal";
import { Confirm, ConfirmHeader, ConfirmBody, ConfirmFooter } from "./confirm";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "./table";
import { UploadImage } from "./upload-image";
import { UploadAvatar } from "./upload-avatar";
import { UploadFile } from "./upload-file";
import { Toaster, toast } from "./toast";
import PlusIcon from "./icons/PlusIcon";

const selectOptions = [
  { label: "Option One", value: "opt-1" },
  { label: "Option Two", value: "opt-2" },
  { label: "Option Three", value: "opt-3" },
];

function ShowcaseDefaultsApp() {
  const [radioVal, setRadioVal] = useState<string | null>("apple");
  const [toggleVal, setToggleVal] = useState(false);
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [selectVal, setSelectVal] = useState<string | number | null>(null);
  const [multiSelectVal, setMultiSelectVal] = useState<(string | number)[]>([]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-8 font-sans space-y-12 max-w-7xl mx-auto">
      <Toaster position="top-right" />

      {/* Header Banner */}
      <header className="border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-primary-100 text-primary-700 rounded">
            Design System Verification
          </span>
          <span className="text-xs text-neutral-500">Tailwind CSS v4 &bull; Modern Tech Blue &bull; Zinc Neutrals</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mt-2">
          @openway/ui Component Defaults Showcase
        </h1>
        <p className="text-sm text-neutral-600 mt-1 max-w-3xl">
          Màn hình kiểm thử hiển thị toàn bộ component ở trạng thái mặc định (pure default props). Dùng để nghiệm thu
          bảng màu mới (#2563eb Modern Blue, Zinc neutral scale) và độ dày viền 1px (border).
        </p>
      </header>

      {/* Section 1: Buttons & Badges */}
      <section data-testid="section-buttons" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          1. Buttons &amp; Badges (Default Props)
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <Button data-testid="default-button">Default Button</Button>
          <IconButton
            aria-label="Add item"
            icon={<PlusIcon className="size-4" />}
            data-testid="default-icon-button"
          />
          <Badge data-testid="default-badge">Default Badge</Badge>
          <Badge>New Update</Badge>
        </div>
      </section>

      {/* Section 2: Text & Numerical Inputs */}
      <section data-testid="section-inputs" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          2. Text &amp; Numerical Inputs (Default Props)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">Input</label>
            <Input data-testid="default-input" placeholder="Default text input" />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">PasswordInput</label>
            <PasswordInput data-testid="default-password-input" placeholder="Default password" />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">NumberInput</label>
            <NumberInput data-testid="default-number-input" placeholder="Default number" />
          </div>
          <div data-testid="default-otp-input" className="md:col-span-2 lg:col-span-3">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">OtpInput</label>
            <OtpInput />
          </div>
          <div data-testid="default-multi-input" className="md:col-span-2">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">MultiInput (Tag Input)</label>
            <MultiInput
              defaultValue={["Next.js", "TailwindCSS"]}
              placeholder="Nhập và nhấn Enter..."
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">TextArea</label>
            <TextArea data-testid="default-textarea" placeholder="Default textarea for long-form comments or descriptions..." />
          </div>
        </div>
      </section>

      {/* Section 3: Selection & Toggles */}
      <section data-testid="section-selections" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          3. Selection, Toggles, Radios &amp; Sliders (Default Props)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="space-y-3">
            <label className="text-xs font-medium text-neutral-600 block">Checkbox &amp; Toggle</label>
            <div className="flex flex-col gap-3">
              <Checkbox
                data-testid="default-checkbox"
                label="Default Checkbox"
                checked={checkboxVal}
                onChange={(e) => setCheckboxVal(e.target.checked)}
              />
              <Toggle
                data-testid="default-toggle"
                label="Default Toggle switch"
                checked={toggleVal}
                onChange={(e) => setToggleVal(e.target.checked)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">CheckboxGroup</label>
            <CheckboxGroup
              data-testid="default-checkbox-group"
              options={[
                { value: "email", label: "Email alerts" },
                { value: "sms", label: "SMS notifications" },
              ]}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">RadioGroup</label>
            <RadioGroup
              data-testid="default-radio-group"
              value={radioVal}
              onChange={setRadioVal}
              options={[
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana" },
              ]}
            />
          </div>

          <div data-testid="default-slider" className="md:col-span-2 lg:col-span-3 space-y-2">
            <label className="text-xs font-medium text-neutral-600 block">Slider</label>
            <Slider defaultValue={40} />
          </div>

          <div data-testid="default-select">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">Select</label>
            <Select
              placeholder="Select an option"
              options={selectOptions}
              value={selectVal}
              onChange={setSelectVal}
            />
          </div>

          <div data-testid="default-multiselect">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">MultiSelect</label>
            <MultiSelect
              placeholder="Select multiple options"
              options={selectOptions}
              value={multiSelectVal}
              onChange={setMultiSelectVal}
            />
          </div>
        </div>
      </section>

      {/* Section 4: Date & Time Pickers */}
      <section data-testid="section-pickers" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          4. Date &amp; Time Pickers &amp; Calendars (Default Props)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div data-testid="default-datepicker">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">DatePicker</label>
            <DatePicker placeholder="Select date" />
          </div>
          <div data-testid="default-daterangepicker">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">DateRangePicker</label>
            <DateRangePicker placeholder="Start Date - End Date" />
          </div>
          <div data-testid="default-timepicker">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">TimePicker</label>
            <TimePicker placeholder="Select time" />
          </div>
          <div data-testid="default-timerangepicker">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">TimeRangePicker</label>
            <TimeRangePicker placeholder="Start Time - End Time" />
          </div>
          <div data-testid="default-datetimepicker">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">DateTimePicker</label>
            <DateTimePicker placeholder="Select date & time" />
          </div>
          <div data-testid="default-datetimerangepicker">
            <label className="text-xs font-medium text-neutral-600 mb-1 block">DateTimeRangePicker</label>
            <DateTimeRangePicker placeholder="Start - End" />
          </div>

          {/* Direct Calendar view for instant visual inspection */}
          <div
            data-testid="default-calendar-preview"
            className="md:col-span-2 lg:col-span-2 border border-neutral-200 rounded-xl p-4 flex flex-col items-center"
          >
            <span className="text-xs font-semibold text-neutral-600 mb-3 self-start">
              Standalone &lt;Calendar /&gt; View (Direct preview)
            </span>
            <Calendar />
          </div>

          {/* Direct TimeView */}
          <div
            data-testid="default-timeview-preview"
            className="border border-neutral-200 rounded-xl p-4 flex flex-col items-center"
          >
            <span className="text-xs font-semibold text-neutral-600 mb-3 self-start">
              Standalone &lt;TimeView /&gt; (Direct preview)
            </span>
            <div className="h-64 border border-neutral-200 rounded-lg overflow-hidden flex justify-center">
              <TimeView />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Feedback, Skeleton & Empty */}
      <section data-testid="section-feedback" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          5. Feedback, Alerts, Skeleton &amp; Empty States (Default Props)
        </h2>
        <div className="space-y-5 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-2 block">Alert (Default Soft Info)</label>
            <Alert
              data-testid="default-alert"
              title="Thông báo hệ thống mặc định"
              description="Hệ thống đã đồng bộ màu Modern Blue (#2563eb) và đường viền 1px tinh gọn."
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button
              variant="outline"
              data-testid="btn-trigger-toast"
              onClick={() => toast.info("Thông báo Toast mặc định!", "Hệ thống hoạt động ổn định.")}
            >
              Trigger Default Toast
            </Button>
            <span className="text-xs text-neutral-500">Nhấp để kiểm tra Toast Notification</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div>
              <label className="text-xs font-medium text-neutral-600 mb-2 block">Skeleton Loading</label>
              <div data-testid="default-skeleton-group" className="space-y-2.5">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-600 mb-2 block">Empty State</label>
              <div className="border border-neutral-200 rounded-xl p-4">
                <Empty data-testid="default-empty" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Popups, Overlays & Dialogs */}
      <section data-testid="section-overlays" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          6. Popups, Overlays &amp; Dialogs (Default Props)
        </h2>
        <div className="space-y-6 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-5">
            <div data-testid="default-tooltip">
              <Tooltip content="Tooltip giải thích mặc định">
                <Button variant="outline">Hover for Tooltip</Button>
              </Tooltip>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="outline" data-testid="default-dropdown-trigger">
                  Default Dropdown Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu data-testid="default-dropdown-menu">
                <DropdownItem>Hồ sơ cá nhân</DropdownItem>
                <DropdownItem>Cài đặt tài khoản</DropdownItem>
                <DropdownSeparator />
                <DropdownItem>Đăng xuất</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Popover>
              <PopoverTrigger>
                <Button variant="outline" data-testid="default-popover-trigger">
                  Default Popover
                </Button>
              </PopoverTrigger>
              <PopoverContent data-testid="default-popover-content">
                <PopoverHeader>Tiêu đề Popover</PopoverHeader>
                <PopoverBody>
                  <p className="text-sm text-neutral-600">Nội dung Popover với padding và border mặc định 1px.</p>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            {/* Modal Dialog Inline Preview */}
            <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50/50">
              <span className="text-xs font-semibold text-neutral-600 mb-2 block">Modal (Inline Box Preview)</span>
              <Modal data-testid="default-modal-dialog">
                <ModalHeader title="Hộp thoại Modal mặc định" />
                <ModalBody>
                  <p className="text-sm text-neutral-600">
                    Giao diện Modal mặc định hiển thị nền trắng sạch, đổ bóng shadow-2xl, viền border-neutral-200/80.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline">Hủy</Button>
                  <Button>Lưu thay đổi</Button>
                </ModalFooter>
              </Modal>
            </div>

            {/* Confirm Dialog Inline Preview */}
            <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50/50">
              <span className="text-xs font-semibold text-neutral-600 mb-2 block">Confirm (Inline Box Preview)</span>
              <Confirm data-testid="default-confirm-dialog">
                <ConfirmHeader title="Xác nhận thực hiện" />
                <ConfirmBody>
                  <p className="text-sm text-neutral-600">
                    Bạn có chắc chắn muốn thực hiện thao tác này không? Toàn bộ giao diện sử dụng 1px border.
                  </p>
                </ConfirmBody>
                <ConfirmFooter />
              </Confirm>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Navigation & Layout */}
      <section data-testid="section-navigation" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          7. Navigation &amp; Layout (Tabs, Collapse, Carousel)
        </h2>
        <div className="space-y-6 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-2 block">Tabs (Default Props)</label>
            <Tabs defaultActiveKey="overview" data-testid="default-tabs">
              <TabList>
                <Tab value="overview" label="Tổng quan" />
                <Tab value="analytics" label="Phân tích" />
                <Tab value="settings" label="Cấu hình" />
              </TabList>
              <TabPanels>
                <TabPanel value="overview">
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-sm text-neutral-700">
                    Nội dung tab Tổng quan với style mặc định.
                  </div>
                </TabPanel>
                <TabPanel value="analytics">
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-sm text-neutral-700">
                    Nội dung tab Phân tích dữ liệu.
                  </div>
                </TabPanel>
                <TabPanel value="settings">
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-sm text-neutral-700">
                    Cấu hình hệ thống.
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div>
              <label className="text-xs font-medium text-neutral-600 mb-2 block">Collapse (Default Props)</label>
              <Collapse defaultActiveKey={["item-1"]} data-testid="default-collapse">
                <CollapsePanel value="item-1" label="1. Giới thiệu bảng màu mới" description="Tech Blue & Zinc">
                  <p className="text-sm text-neutral-600">
                    Palette màu đã được cập nhật sang #2563eb chuẩn chuyên nghiệp, kết hợp gam màu trung tính zinc.
                  </p>
                </CollapsePanel>
                <CollapsePanel value="item-2" label="2. Cấu trúc viền 1px đồng bộ">
                  <p className="text-sm text-neutral-600">
                    Mọi component sử dụng viền 1px tinh tế thay cho border 2px thô cứng trước đây.
                  </p>
                </CollapsePanel>
              </Collapse>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-600 mb-2 block">Carousel (Default Props)</label>
              <Carousel data-testid="default-carousel" className="w-full">
                <CarouselContent>
                  <CarouselSlide>
                    <div className="h-32 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-700 font-medium">
                      Slide #1
                    </div>
                  </CarouselSlide>
                  <CarouselSlide>
                    <div className="h-32 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-700 font-medium">
                      Slide #2
                    </div>
                  </CarouselSlide>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                <CarouselPagination />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Table Data Display */}
      <section data-testid="section-table" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          8. Table &amp; Data Display (Default Props)
        </h2>
        <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <div className="overflow-x-auto border border-neutral-200 rounded-lg">
            <Table data-testid="default-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Mã NV</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Chức vụ</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-xs text-neutral-500">#EMP001</TableCell>
                  <TableCell className="font-medium text-neutral-900">Nguyễn Văn An</TableCell>
                  <TableCell>Senior Architect</TableCell>
                  <TableCell className="text-neutral-500">an.nguyen@example.com</TableCell>
                  <TableCell>
                    <Badge color="success">Hoạt động</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-xs text-neutral-500">#EMP002</TableCell>
                  <TableCell className="font-medium text-neutral-900">Trần Thị Bích</TableCell>
                  <TableCell>Product Designer</TableCell>
                  <TableCell className="text-neutral-500">bich.tran@example.com</TableCell>
                  <TableCell>
                    <Badge color="neutral">Tạm dừng</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-xs text-neutral-500">
                    Hiển thị 2 bản ghi mẫu trong bảng dữ liệu mặc định.
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </section>

      {/* Section 9: File & Image Uploaders */}
      <section data-testid="section-uploaders" className="space-y-4">
        <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          9. File, Image &amp; Avatar Uploaders (Default Props)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-white rounded-xl border border-neutral-200 shadow-xs">
          <div data-testid="default-upload-avatar">
            <label className="text-xs font-medium text-neutral-600 mb-2 block">UploadAvatar (Default)</label>
            <div className="flex justify-center p-4 border border-neutral-200 rounded-xl">
              <UploadAvatar />
            </div>
          </div>

          <div data-testid="default-upload-image" className="md:col-span-2">
            <label className="text-xs font-medium text-neutral-600 mb-2 block">UploadImage (Default Dropzone)</label>
            <UploadImage />
          </div>

          <div data-testid="default-upload-file" className="md:col-span-3">
            <label className="text-xs font-medium text-neutral-600 mb-2 block">UploadFile (Default Dropzone)</label>
            <UploadFile />
          </div>
        </div>
      </section>
    </div>
  );
}

describe("<ShowcaseDefaults />", () => {
  it("mounts all components with pure default props", () => {
    cy.viewport(1440, 900);
    cy.mount(<ShowcaseDefaultsApp />);

    // Verify main header
    cy.contains("@openway/ui Component Defaults Showcase").should("be.visible");

    // 1. Buttons & Badges
    cy.get('[data-testid="default-button"]').should("be.visible").and("contain.text", "Default Button");
    cy.get('[data-testid="default-icon-button"]').should("be.visible");
    cy.get('[data-testid="default-badge"]').should("be.visible").and("contain.text", "Default Badge");

    // 2. Inputs
    cy.get('[data-testid="default-input"]').should("be.visible");
    cy.get('[data-testid="default-password-input"]').should("be.visible");
    cy.get('[data-testid="default-number-input"]').should("be.visible");
    cy.get('[data-testid="default-otp-input"]').should("be.visible");
    cy.get('[data-testid="default-multi-input"]').should("be.visible");
    cy.get('[data-testid="default-textarea"]').should("be.visible");

    // 3. Selections
    cy.get('[data-testid="default-checkbox"]').should("be.visible");
    cy.get('[data-testid="default-toggle"]').should("be.visible");
    cy.get('[data-testid="default-checkbox-group"]').should("be.visible");
    cy.get('[data-testid="default-radio-group"]').should("be.visible");
    cy.get('[data-testid="default-slider"]').should("be.visible");
    cy.get('[data-testid="default-select"]').should("be.visible");
    cy.get('[data-testid="default-multiselect"]').should("be.visible");

    // 4. Pickers
    cy.get('[data-testid="default-datepicker"]').should("be.visible");
    cy.get('[data-testid="default-daterangepicker"]').should("be.visible");
    cy.get('[data-testid="default-timepicker"]').should("be.visible");
    cy.get('[data-testid="default-timerangepicker"]').should("be.visible");
    cy.get('[data-testid="default-datetimepicker"]').should("be.visible");
    cy.get('[data-testid="default-datetimerangepicker"]').should("be.visible");
    cy.get('[data-testid="default-calendar-preview"]').should("be.visible");
    cy.get('[data-testid="default-timeview-preview"]').should("be.visible");

    // 5. Feedback
    cy.get('[data-testid="default-alert"]').should("be.visible");
    cy.get('[data-testid="default-skeleton-group"]').should("be.visible");
    cy.get('[data-testid="default-empty"]').should("be.visible");

    // 6. Overlays
    cy.get('[data-testid="default-tooltip"]').should("be.visible");
    cy.get('[data-testid="default-dropdown-trigger"]').should("be.visible");
    cy.get('[data-testid="default-popover-trigger"]').should("be.visible");
    cy.get('[data-testid="default-modal-dialog"]').should("be.visible");
    cy.get('[data-testid="default-confirm-dialog"]').should("be.visible");

    // 7. Navigation
    cy.get('[data-testid="default-tabs"]').should("be.visible");
    cy.get('[data-testid="default-collapse"]').should("be.visible");
    cy.get('[data-testid="default-carousel"]').should("be.visible");

    // 8. Table
    cy.get('[data-testid="default-table"]').should("be.visible");

    // 9. Uploaders
    cy.get('[data-testid="default-upload-avatar"]').should("be.visible");
    cy.get('[data-testid="default-upload-image"]').should("be.visible");
    cy.get('[data-testid="default-upload-file"]').should("be.visible");
  });
});
