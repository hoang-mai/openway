import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownHeader,
  DropdownSeparator,
  DropdownGroup,
} from "./index";

const ProfileIcon = () => (
  <svg data-testid="profile-icon" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg data-testid="trash-icon" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

describe("<Dropdown /> Component Tests (Single Mount Harness)", () => {
  it("verifies all dropdown functionalities with a single mount", () => {
    const onProfileClick = cy.stub().as("onProfileClick");
    const onSettingsClick = cy.stub().as("onSettingsClick");
    const onDisabledClick = cy.stub().as("onDisabledClick");
    const onDeleteClick = cy.stub().as("onDeleteClick");

    // Single mount for the whole test workflow
    cy.mount(
      <div style={{ padding: 100 }}>
        <Dropdown size="md" color="primary" placement="bottom-start">
          <DropdownTrigger>
            <button id="test-dropdown-trigger">Menu Options</button>
          </DropdownTrigger>
          <DropdownMenu id="test-dropdown-menu">
            <DropdownHeader>My Account</DropdownHeader>
            <DropdownGroup label="Personal">
              <DropdownItem
                id="item-profile"
                startIcon={<ProfileIcon />}
                shortcut="⌘P"
                description="View your profile"
                onClick={onProfileClick}
              >
                Profile
              </DropdownItem>
              <DropdownItem id="item-settings" shortcut="⌘S" onClick={onSettingsClick}>
                Settings
              </DropdownItem>
            </DropdownGroup>
            <DropdownSeparator id="test-separator" />
            <DropdownGroup label="Actions">
              <DropdownItem id="item-disabled" disabled onClick={onDisabledClick}>
                Disabled Action
              </DropdownItem>
              <DropdownItem id="item-delete" danger startIcon={<TrashIcon />} shortcut="⌘D" onClick={onDeleteClick}>
                Delete Account
              </DropdownItem>
            </DropdownGroup>
          </DropdownMenu>
        </Dropdown>
      </div>
    );

    // 1. Initial State: Trigger exists, menu is not mounted/visible
    cy.get("#test-dropdown-trigger")
      .should("be.visible")
      .and("have.attr", "aria-expanded", "false")
      .and("have.attr", "aria-haspopup", "menu");
    cy.get("#test-dropdown-menu").should("not.exist");

    // 2. Open via Click
    cy.get("#test-dropdown-trigger").click();
    cy.get("#test-dropdown-trigger").should("have.attr", "aria-expanded", "true");
    cy.get("#test-dropdown-menu").should("be.visible").and("have.attr", "role", "menu");

    // 3. Verify structure: Header, Group, Separator, Items, Icons, Shortcuts
    cy.get("#test-dropdown-menu").contains("My Account").should("be.visible");
    cy.get("#test-separator").should("be.visible");
    cy.get('[data-testid="profile-icon"]').should("be.visible");
    cy.get("#item-profile").contains("View your profile").should("be.visible");
    cy.get("#item-profile kbd").contains("⌘P").should("be.visible");
    cy.get("#item-delete").should("have.class", "text-error-600");

    // 4. Keyboard Navigation: ArrowDown, ArrowUp, Home, End
    cy.get("#test-dropdown-trigger").type("{downarrow}");
    cy.get("#item-profile").should("have.attr", "tabindex", "0");

    cy.focused().type("{downarrow}");
    cy.get("#item-settings").should("have.attr", "tabindex", "0");

    // Next down arrow should focus delete item (skipping disabled item)
    cy.focused().type("{downarrow}");
    cy.get("#item-delete").should("have.attr", "tabindex", "0");

    // Home jumps to first item
    cy.focused().type("{home}");
    cy.get("#item-profile").should("have.attr", "tabindex", "0");

    // End jumps to last item
    cy.focused().type("{end}");
    cy.get("#item-delete").should("have.attr", "tabindex", "0");

    // 5. Test Escape key to close
    cy.focused().type("{esc}");
    cy.get("#test-dropdown-menu").should("not.exist");
    cy.get("#test-dropdown-trigger").should("have.attr", "aria-expanded", "false");

    // 6. Reopen with Click
    cy.get("#test-dropdown-trigger").click();
    cy.get("#test-dropdown-menu").should("be.visible");

    // 7. Verify disabled item cannot be clicked
    cy.get("#item-disabled").should("have.attr", "aria-disabled", "true").click({ force: true });
    cy.get("@onDisabledClick").should("not.have.been.called");
    // Menu stays open when disabled item is clicked
    cy.get("#test-dropdown-menu").should("be.visible");

    // 8. Select an active item (e.g. Profile) -> calls callback & closes menu
    cy.get("#item-profile").click();
    cy.get("@onProfileClick").should("have.been.calledOnce");
    cy.get("#test-dropdown-menu").should("not.exist");
  });
});
