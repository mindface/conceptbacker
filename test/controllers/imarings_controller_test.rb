require "test_helper"

class ImaringsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @imaring = imarings(:one)
  end

  test "should get index" do
    get imarings_url
    assert_response :success
  end

  test "should get new" do
    get new_imaring_url
    assert_response :success
  end

  test "should create imaring" do
    assert_difference("Imaring.count") do
      post imarings_url, params: { imaring: { conectid: @imaring.conectid, name: @imaring.name } }
    end

    assert_redirected_to imaring_url(Imaring.last)
  end

  test "should show imaring" do
    get imaring_url(@imaring)
    assert_response :success
  end

  test "should get edit" do
    get edit_imaring_url(@imaring)
    assert_response :success
  end

  test "should update imaring" do
    patch imaring_url(@imaring), params: { imaring: { conectid: @imaring.conectid, name: @imaring.name } }
    assert_redirected_to imaring_url(@imaring)
  end

  test "should destroy imaring" do
    assert_difference("Imaring.count", -1) do
      delete imaring_url(@imaring)
    end

    assert_redirected_to imarings_url
  end
end
