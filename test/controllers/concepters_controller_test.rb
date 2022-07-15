require "test_helper"

class ConceptersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @concepter = concepters(:one)
  end

  test "should get index" do
    get concepters_url
    assert_response :success
  end

  test "should get new" do
    get new_concepter_url
    assert_response :success
  end

  test "should create concepter" do
    assert_difference("Concepter.count") do
      post concepters_url, params: { concepter: { body: @concepter.body, info: @concepter.info, path: @concepter.path, title: @concepter.title } }
    end

    assert_redirected_to concepter_url(Concepter.last)
  end

  test "should show concepter" do
    get concepter_url(@concepter)
    assert_response :success
  end

  test "should get edit" do
    get edit_concepter_url(@concepter)
    assert_response :success
  end

  test "should update concepter" do
    patch concepter_url(@concepter), params: { concepter: { body: @concepter.body, info: @concepter.info, path: @concepter.path, title: @concepter.title } }
    assert_redirected_to concepter_url(@concepter)
  end

  test "should destroy concepter" do
    assert_difference("Concepter.count", -1) do
      delete concepter_url(@concepter)
    end

    assert_redirected_to concepters_url
  end
end
