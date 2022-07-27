require "application_system_test_case"

class QuantifiesTest < ApplicationSystemTestCase
  setup do
    @quantify = quantifies(:one)
  end

  test "visiting the index" do
    visit quantifies_url
    assert_selector "h1", text: "Quantifies"
  end

  test "should create quantify" do
    visit quantifies_url
    click_on "New quantify"

    fill_in "Disc", with: @quantify.disc
    fill_in "Goalnum", with: @quantify.goalNum
    fill_in "Levelisenum", with: @quantify.leveliseNum
    fill_in "Ratenum", with: @quantify.rateNum
    fill_in "Title", with: @quantify.title
    fill_in "User", with: @quantify.user_id
    click_on "Create Quantify"

    assert_text "Quantify was successfully created"
    click_on "Back"
  end

  test "should update Quantify" do
    visit quantify_url(@quantify)
    click_on "Edit this quantify", match: :first

    fill_in "Disc", with: @quantify.disc
    fill_in "Goalnum", with: @quantify.goalNum
    fill_in "Levelisenum", with: @quantify.leveliseNum
    fill_in "Ratenum", with: @quantify.rateNum
    fill_in "Title", with: @quantify.title
    fill_in "User", with: @quantify.user_id
    click_on "Update Quantify"

    assert_text "Quantify was successfully updated"
    click_on "Back"
  end

  test "should destroy Quantify" do
    visit quantify_url(@quantify)
    click_on "Destroy this quantify", match: :first

    assert_text "Quantify was successfully destroyed"
  end
end
