require "test_helper"

class DictiosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dictio = dictios(:one)
  end

  test "should get index" do
    get dictios_url
    assert_response :success
  end

  test "should get new" do
    get new_dictio_url
    assert_response :success
  end

  test "should create dictio" do
    assert_difference("Dictio.count") do
      post dictios_url, params: { dictio: { disc: @dictio.disc, env: @dictio.env, goal: @dictio.goal, levelise: @dictio.levelise, rate: @dictio.rate, user_id: @dictio.user_id } }
    end

    assert_redirected_to dictio_url(Dictio.last)
  end

  test "should show dictio" do
    get dictio_url(@dictio)
    assert_response :success
  end

  test "should get edit" do
    get edit_dictio_url(@dictio)
    assert_response :success
  end

  test "should update dictio" do
    patch dictio_url(@dictio), params: { dictio: { disc: @dictio.disc, env: @dictio.env, goal: @dictio.goal, levelise: @dictio.levelise, rate: @dictio.rate, user_id: @dictio.user_id } }
    assert_redirected_to dictio_url(@dictio)
  end

  test "should destroy dictio" do
    assert_difference("Dictio.count", -1) do
      delete dictio_url(@dictio)
    end

    assert_redirected_to dictios_url
  end
end
