require "application_system_test_case"

class ConceptersTest < ApplicationSystemTestCase
  setup do
    @concepter = concepters(:one)
  end

  test "visiting the index" do
    visit concepters_url
    assert_selector "h1", text: "Concepters"
  end

  test "should create concepter" do
    visit concepters_url
    click_on "New concepter"

    fill_in "Body", with: @concepter.body
    fill_in "Info", with: @concepter.info
    fill_in "Path", with: @concepter.path
    fill_in "Title", with: @concepter.title
    click_on "Create Concepter"

    assert_text "Concepter was successfully created"
    click_on "Back"
  end

  test "should update Concepter" do
    visit concepter_url(@concepter)
    click_on "Edit this concepter", match: :first

    fill_in "Body", with: @concepter.body
    fill_in "Info", with: @concepter.info
    fill_in "Path", with: @concepter.path
    fill_in "Title", with: @concepter.title
    click_on "Update Concepter"

    assert_text "Concepter was successfully updated"
    click_on "Back"
  end

  test "should destroy Concepter" do
    visit concepter_url(@concepter)
    click_on "Destroy this concepter", match: :first

    assert_text "Concepter was successfully destroyed"
  end
end
