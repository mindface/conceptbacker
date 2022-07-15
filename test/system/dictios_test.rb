require "application_system_test_case"

class DictiosTest < ApplicationSystemTestCase
  setup do
    @dictio = dictios(:one)
  end

  test "visiting the index" do
    visit dictios_url
    assert_selector "h1", text: "Dictios"
  end

  test "should create dictio" do
    visit dictios_url
    click_on "New dictio"

    fill_in "Disc", with: @dictio.disc
    fill_in "Env", with: @dictio.env
    fill_in "Goal", with: @dictio.goal
    fill_in "Levelise", with: @dictio.levelise
    fill_in "Rate", with: @dictio.rate
    fill_in "User", with: @dictio.user_id
    click_on "Create Dictio"

    assert_text "Dictio was successfully created"
    click_on "Back"
  end

  test "should update Dictio" do
    visit dictio_url(@dictio)
    click_on "Edit this dictio", match: :first

    fill_in "Disc", with: @dictio.disc
    fill_in "Env", with: @dictio.env
    fill_in "Goal", with: @dictio.goal
    fill_in "Levelise", with: @dictio.levelise
    fill_in "Rate", with: @dictio.rate
    fill_in "User", with: @dictio.user_id
    click_on "Update Dictio"

    assert_text "Dictio was successfully updated"
    click_on "Back"
  end

  test "should destroy Dictio" do
    visit dictio_url(@dictio)
    click_on "Destroy this dictio", match: :first

    assert_text "Dictio was successfully destroyed"
  end
end
