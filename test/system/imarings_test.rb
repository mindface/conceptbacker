require "application_system_test_case"

class ImaringsTest < ApplicationSystemTestCase
  setup do
    @imaring = imarings(:one)
  end

  test "visiting the index" do
    visit imarings_url
    assert_selector "h1", text: "Imarings"
  end

  test "should create imaring" do
    visit imarings_url
    click_on "New imaring"

    fill_in "Conectid", with: @imaring.conectid
    fill_in "Name", with: @imaring.name
    click_on "Create Imaring"

    assert_text "Imaring was successfully created"
    click_on "Back"
  end

  test "should update Imaring" do
    visit imaring_url(@imaring)
    click_on "Edit this imaring", match: :first

    fill_in "Conectid", with: @imaring.conectid
    fill_in "Name", with: @imaring.name
    click_on "Update Imaring"

    assert_text "Imaring was successfully updated"
    click_on "Back"
  end

  test "should destroy Imaring" do
    visit imaring_url(@imaring)
    click_on "Destroy this imaring", match: :first

    assert_text "Imaring was successfully destroyed"
  end
end
