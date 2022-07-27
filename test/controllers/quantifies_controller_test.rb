require "test_helper"

class QuantifiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @quantify = quantifies(:one)
  end

  test "should get index" do
    get quantifies_url
    assert_response :success
  end

  test "should get new" do
    get new_quantify_url
    assert_response :success
  end

  test "should create quantify" do
    assert_difference("Quantify.count") do
      post quantifies_url, params: { quantify: { disc: @quantify.disc, goalNum: @quantify.goalNum, leveliseNum: @quantify.leveliseNum, rateNum: @quantify.rateNum, title: @quantify.title, user_id: @quantify.user_id } }
    end

    assert_redirected_to quantify_url(Quantify.last)
  end

  test "should show quantify" do
    get quantify_url(@quantify)
    assert_response :success
  end

  test "should get edit" do
    get edit_quantify_url(@quantify)
    assert_response :success
  end

  test "should update quantify" do
    patch quantify_url(@quantify), params: { quantify: { disc: @quantify.disc, goalNum: @quantify.goalNum, leveliseNum: @quantify.leveliseNum, rateNum: @quantify.rateNum, title: @quantify.title, user_id: @quantify.user_id } }
    assert_redirected_to quantify_url(@quantify)
  end

  test "should destroy quantify" do
    assert_difference("Quantify.count", -1) do
      delete quantify_url(@quantify)
    end

    assert_redirected_to quantifies_url
  end
end
